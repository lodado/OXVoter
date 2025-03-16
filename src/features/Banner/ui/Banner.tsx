import { Edit2, Trash2 } from "lucide-react";
import React from "react";

import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";

export interface BannerProps {
  id: string;
  name: string;
  description: string;
  color: string;
  specialAbility: string;
  isEvil: boolean;
}

export interface BannerActions {
  onEditRole: (role: BannerProps) => void;
  onDeleteRole: (roleId: string) => void;
}

const Banner = (props: BannerProps & BannerActions) => {
  return (
    <div
      key={props.id}
      className="flex items-center justify-between p-2 rounded-md bg-slate-800/80 text-white shadow-xl backdrop-blur"
      style={{ borderLeft: `4px solid ${props.color}` }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{props.name}</span>
          <Badge variant={props.isEvil ? "error" : "success"} className="h-6 bg-transparent">
            {props.isEvil ? "악역" : "선역"}
          </Badge>
        </div>
        <p className="text-xs text-slate-300 mt-1">{props.description}</p>
        {props.specialAbility && (
          <p className="text-xs text-slate-400 mt-1">
            <span className="font-medium">특수 능력:</span> {props.specialAbility}
          </p>
        )}
      </div>
      <div className="flex gap-1">
        <Button variant="link" className="" onClick={() => props.onEditRole(props)}>
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button variant="link" onClick={() => props.onDeleteRole(props.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Banner;
