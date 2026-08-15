"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { TeamMember } from "@/types";

type TeamCardProps = {
  member: TeamMember;
  index?: number;
};

export function TeamCard({ member, index = 0 }: TeamCardProps) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="relative aspect-[3/4] rounded-[var(--radius-media)] overflow-hidden mb-4">
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.role} at Smith Tait`}
          fill
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {member.bio && (
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <p className="text-xs font-body text-[var(--color-white)]/80 line-clamp-3">
              {member.bio}
            </p>
          </div>
        )}
      </div>
      <h3 className="font-display font-medium text-lg">{member.name}</h3>
      <p className="text-sm font-body text-[var(--color-grey)] mt-1">
        {member.role}
      </p>
    </motion.div>
  );
}
