import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";

async function getProducts(searchParams: any) {
    try {
        const query = new URLSearchParams(searchParams).toString();
        const res = await fetch(`http://localhost:4000/products?${query}`, { cache: "no-store" });
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        return [];
    }
}

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const products = await getProducts(searchParams);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <ProductFilters />
                </aside>

                {/* Main Grid */}
                <div className="flex-1">
                    {products.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground border rounded-xl bg-card">
                            No products found matching your filters.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product: any) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
