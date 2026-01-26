import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const { items, total, userId } = createOrderDto;

    // 1. Validate Stock & Calculate Real Total (Security)
    let calculatedTotal = 0;

    // We need to fetch products to check stock and price
    for (const item of items) {
      const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        throw new BadRequestException(`Product ID ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${product.name}`);
      }
      calculatedTotal += Number(product.price) * item.quantity;
    }

    // 2. Create Order Transaction
    const order = await this.prisma.$transaction(async (tx) => {
      // Create the order
      const order = await tx.order.create({
        data: {
          total: calculatedTotal,
          userId: userId || 1, // Default user
          status: 'PENDING',
          items: {
            create: items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        },
        include: { items: { include: { product: true } }, user: true }
      });

      // Update Stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      return order;
    });

    // 3. Send Email Notification
    try {
      await this.mailerService.sendMail({
        to: order.user?.email || 'customer@example.com',
        subject: `ElectroStore: Order #${order.id} Confirmed`,
        template: 'order-confirmation',
        context: {
          name: order.user?.name || 'Customer',
          orderId: order.id,
          total: order.total,
          items: order.items.map(i => ({
            productName: i.product.name,
            quantity: i.quantity,
            price: i.price
          }))
        },
      });
    } catch (e) {
      console.error("Failed to send email", e);
    }

    return order;
  }

  findAll() {
    return this.prisma.order.findMany({
      include: { user: true, items: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { user: true, items: { include: { product: true } } }
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto as any
    });
  }

  remove(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }
}
