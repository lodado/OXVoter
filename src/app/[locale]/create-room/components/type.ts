export type RoleType = {
  id: string;
  name: string;
  description: string;
  color: string;
  specialAbility: string;
  isEvil: boolean;
};

export interface RoleSettingsDialogProps {
  roles: RoleType[];
  onRolesChange: (roles: RoleType[]) => void;
}
