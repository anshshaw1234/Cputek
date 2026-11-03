import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const ProductIcon = product.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
      }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="group relative cursor-pointer h-full"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="glass-card h-full p-8 rounded-2xl flex flex-col hover:bg-white/10 hover:shadow-[0_15px_50px_-10px_rgba(255,215,0,0.2)] hover:border-primary/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 smooth-transition" />
        
        <div className="absolute top-4 right-4 z-10">
          <Sparkles className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 smooth-transition drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
        </div>
        
        <div className="mb-6 inline-flex p-4 rounded-xl bg-white/5 border border-white/10 text-primary relative z-10 group-hover:scale-110 smooth-transition">
          <ProductIcon className="w-8 h-8" />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary smooth-transition relative z-10">
          {product.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-8 flex-grow relative z-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto relative z-10">
          <span className="text-sm font-semibold text-primary group-hover:text-primary/80 smooth-transition">
            Explore product
          </span>
          <div className="w-10 h-10 rounded-full glass-button flex items-center justify-center group-hover:bg-primary group-hover:border-primary smooth-transition">
            <span className="text-primary group-hover:text-primary-foreground smooth-transition">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;