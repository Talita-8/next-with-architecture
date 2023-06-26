import { FilterDto } from "@packages/customer-acquisition";
import {
  LeadDataSourcePort,
  LeadDto,
  UpdateLeadDto,
} from "@packages/customer-acquisition/application";

class LocalAPILeadDataSource implements LeadDataSourcePort {
  static key = "Lead:";
  static url = "http://localhost:4000/leads";

  async save(lead: LeadDto) {
    fetch(LocalAPILeadDataSource.url, {
      method: 'POST',
      body: JSON.stringify(lead),
      headers: {
        "Content-Type": "application/json"
      },
    });
  }

  async find(id: string): Promise<LeadDto> {
    const lead = await fetch(LocalAPILeadDataSource.url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then((data: Response) => (<any>data).id === id ? data : null);

    return lead ? lead.json() : null;
  }

  async filter(filter: FilterDto) {
    const lead = await fetch(LocalAPILeadDataSource.url).then(
      (data: Response) => data);
    return lead ? lead.json() : null;
  }

  async update(properties: UpdateLeadDto) {
    await fetch(LocalAPILeadDataSource.url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then((data: Response) => {
      if ((<any>data).id === properties.id) {
        const property = properties.property
        const newLead: { [key: string]: any } = {
          id: (<any>data).id,
          cpf: (<any>data).cpf,
          email: (<any>data).email,
          fullName: (<any>data).fullName
        };
        newLead[property] = properties.value;

        fetch(LocalAPILeadDataSource.url, {
          method: 'POST',
          body: JSON.stringify(newLead),
          headers: {
            "Content-Type": "application/json"
          },
        });
      }
    });
  }
}
export default LocalAPILeadDataSource;
