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
      async (data: Response) => {
        if (filter.query) {
          const body: LeadDto[] = await (<any>data).json();
          return body.map(item => {
            if (Object
              .values(item)
              .find(property => property.includes(filter.query))) {
              return item;
            }
          }).find(lead => lead);
        } else {
          return data;
        }
      }
    );
    if (lead) {
      return filter.query ? [lead] : lead.json();
    }
    return null;
  }

  async update(properties: UpdateLeadDto) {
    await fetch(LocalAPILeadDataSource.url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      async (data: Response) => {
        const body: LeadDto[] = await (<any>data).json();
        const lead = body.map(item => {
          if (Object
            .values(item)
            .find(property => property.includes(properties.id))) {
            return item;
          }
        }).find(lead => lead);

        if (lead) {
          const property = properties.property
          const newLead: { [key: string]: any } = {
            id: lead.id,
            cpf: lead.cpf,
            email: lead.email,
            fullName: lead.fullName
          };
          newLead[property] = properties.value;

          fetch(LocalAPILeadDataSource.url + `/${newLead.id}`, {
            method: 'PUT',
            body: JSON.stringify(newLead),
            headers: {
              "Content-Type": "application/json"
            },
          });
        }
      }
    );
  }
}
export default LocalAPILeadDataSource;
