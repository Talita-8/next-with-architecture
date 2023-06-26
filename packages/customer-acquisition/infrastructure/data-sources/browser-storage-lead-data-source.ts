import { FilterDto } from "@packages/customer-acquisition";
import {
  LeadDataSourcePort,
  LeadDto,
  UpdateLeadDto,
} from "@packages/customer-acquisition/application";

class BrowserStorageLeadDataSource implements LeadDataSourcePort {
  static key = "Lead:";

  constructor(private storage: Storage) {}

  async save(lead: LeadDto) {
    this.storage.setItem(
      `${BrowserStorageLeadDataSource.key}${lead.id}`,
      JSON.stringify(lead)
    );
  }

  async find(id: string): Promise<LeadDto> {
    const lead = this.storage.getItem(
      `${BrowserStorageLeadDataSource.key}${id}`
    );
    return lead ? JSON.parse(lead) : null;
  }

  async filter(filter: FilterDto): Promise<LeadDto[]> {
    return Object.keys(this.storage)
      .filter((key) => key.startsWith(BrowserStorageLeadDataSource.key))
      .slice(filter.offset, filter.offset + filter.limit)
      .map((key) => {
        const lead = this.storage.getItem(key);
        return lead ? JSON.parse(lead) : null;
      })
      .filter(
        (lead) =>
          lead &&
          (!filter.query ||
            lead.fullName.toLowerCase().includes(filter.query.toLowerCase()))
      );
  }

  async update(properties: UpdateLeadDto) {
    let lead = this.storage.getItem(
      `${BrowserStorageLeadDataSource.key}${properties.id}`
    );
    const property = properties.property
    if (lead) {
      const newLead: {[key: string]: any} = {
        id: JSON.parse(lead).id,
        cpf:JSON.parse(lead).cpf,
        email: JSON.parse(lead).email,
        fullName: JSON.parse(lead).fullName
      };
      
      newLead[property] = properties.value;
      this.storage.setItem(`${BrowserStorageLeadDataSource.key}${properties.id}`, JSON.stringify(newLead));
    }
  }
}

export default BrowserStorageLeadDataSource;
