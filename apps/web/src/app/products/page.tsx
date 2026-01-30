import { ProductCard } from "@/components/product-card";

async function getProducts() {
    try {
        const res = await fetch("http://localhost:4000/products", { cache: "no-store" });
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>
            {products.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    No products found.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
