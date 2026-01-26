import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Clear existing data to avoid duplicates with new schema
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    const products = [
        {
            name: 'Arduino Uno R3',
            description: 'The classic Arduino board for beginners. ATmega328P based.',
            price: 25.00,
            stock: 50,
            category: 'Development Boards',
            image: 'https://images.unsplash.com/photo-1608531745771-55dbd7c4842f?q=80&w=1000',
            datasheet: 'https://docs.arduino.cc/resources/datasheets/A000066-datasheet.pdf',
            specs: JSON.stringify({
                "Microcontroller": "ATmega328P",
                "Operating Voltage": "5V",
                "Input Voltage": "7-12V",
                "Digital I/O Pins": "14",
                "Analog Input Pins": "6",
                "Flash Memory": "32 KB"
            })
        },
        {
            name: 'Raspberry Pi 4 Model B',
            description: 'A powerful single-board computer with 4GB RAM, Quad-core CPU.',
            price: 55.00,
            stock: 30,
            category: 'Development Boards',
            image: 'https://images.unsplash.com/photo-1629810849646-6085a66a1e36?q=80&w=1000',
            datasheet: 'https://datasheets.raspberrypi.com/rpi4/raspberry-pi-4-datasheet.pdf',
            specs: JSON.stringify({
                "Processor": "Broadcom BCM2711",
                "RAM": "4GB LPDDR4-3200",
                "Connectivity": "Dual-band WiFi, Bluetooth 5.0",
                "Ports": "2x Micro-HDMI, 2x USB 3.0, 2x USB 2.0"
            })
        },
        {
            name: 'HC-SR04 Ultrasonic Sensor',
            description: 'Distance measuring sensor module using ultrasonic waves.',
            price: 2.50,
            stock: 200,
            category: 'Sensors',
            image: 'https://m.media-amazon.com/images/I/61s8gH2lKzL._AC_SL1500_.jpg',
            specs: JSON.stringify({
                "Range": "2cm - 400cm",
                "Accuracy": "3mm",
                "Operating Voltage": "5V DC",
                "Operating Current": "15mA"
            })
        },
        {
            name: 'SG90 Micro Servo Motor',
            description: 'Tiny and lightweight servo motor for RC airplanes and robotics.',
            price: 3.00,
            stock: 150,
            category: 'Robotics',
            image: 'https://m.media-amazon.com/images/I/41-3P5y8JBL._AC_SL1000_.jpg',
            specs: JSON.stringify({
                "Weight": "9g",
                "Stall Torque": "1.8 kgf·cm",
                "Operating Speed": "0.1 s/60 degree",
                "Operating Voltage": "4.8V"
            })
        },
        {
            name: 'ESP32 Wi-Fi + Bluetooth Module',
            description: 'Powerful generic Wi-Fi+BT+BLE MCU module used for IoT.',
            price: 6.00,
            stock: 100,
            category: 'IoT & Wireless',
            image: 'https://m.media-amazon.com/images/I/61Xj2xV-pZL._AC_SL1500_.jpg',
            specs: JSON.stringify({
                "CPU": "Xtensa® Dual-Core 32-bit LX6",
                "Wi-Fi": "802.11 b/g/n",
                "Bluetooth": "v4.2 BR/EDR and BLE",
                "Memory": "520 KB SRAM"
            })
        }
    ];

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
