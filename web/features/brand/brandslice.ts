export interface Brand {
    id: string | number;
    name: string;
    description: string;
    logoUrl: string;
    status: "active" | "inactive";
}