import React from 'react';
import { motion } from 'framer-motion';

const TeamMemberCard = ({ member, index }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -10 }}
      className="glass-card p-6 rounded-2xl text-center group hover:bg-white/10 hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.1)] hover:border-white/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
      
      <div className="w-24 h-24 mx-auto mb-5 rounded-2xl glass-button flex items-center justify-center text-primary font-bold text-3xl group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] smooth-transition relative z-10">
        {member.initials}
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-1 relative z-10">{member.name}</h3>
      <p className="text-sm text-primary font-medium mb-4 relative z-10">{member.role}</p>
      <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{member.bio}</p>
    </motion.div>
  );
};

export default TeamMemberCard;