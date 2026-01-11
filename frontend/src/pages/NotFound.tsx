import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router";

export function NotFound() {
    return <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        {/* Icon with Animation */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
        >
            <h1 className="text-primary text-9xl font-bold">
                404
            </h1>
        </motion.div>

        {/* Message */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="space-y-2 mb-8"
        >
            <h1 className="text-2xl font-bold text-foreground">
                Halaman Tidak Ditemukan
            </h1>
            <p className="text-muted-foreground max-w-md">
                Halaman yang Anda cari tidak tersedia. Silakan periksa URL atau kembali.
            </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-3"
        >
            <Link to="/">
                <Button>
                    <Home className="h-4 w-4 mr-2" />
                    Kembali ke Beranda
                </Button>
            </Link>
            <Link to="/products">
                <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Lihat Produk
                </Button>
            </Link>
        </motion.div>
    </div>
}