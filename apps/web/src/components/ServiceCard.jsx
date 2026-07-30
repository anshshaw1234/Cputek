import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ service, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative cursor-pointer h-full"
      onClick={() => navigate(`/services/${service.id}`)}
    >
      <div className="glass-card h-full p-8 rounded-2xl flex flex-col hover:bg-white/10 hover:shadow-[0_10px_40px_-10px_rgba(255,215,0,0.15)] hover:border-primary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
        
        <div className="mb-6 inline-flex p-4 rounded-xl bg-white/5 border border-white/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground smooth-transition relative z-10 shadow-[0_0_15px_rgba(255,215,0,0.1)] group-hover:shadow-[0_0_25px_rgba(255,215,0,0.4)]">
          {service.icon}
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary smooth-transition relative z-10">
          {service.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-8 flex-grow relative z-10">
          {service.description}
        </p>
        
        <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 smooth-transition mt-auto relative z-10">
          Learn more
          <ArrowRight className="ml-2 w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;