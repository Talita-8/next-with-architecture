import { FilterDto, LeadDto } from "@packages/customer-acquisition";

interface LeadDataSourcePort {
  save(lead: LeadDto): Promise<void>;

  find(id: string): Promise<LeadDto>;

  filter(filter: FilterDto): Promise<LeadDto[]>;

  update(properties: object): Promise<void>;
}

export default LeadDataSourcePort;
