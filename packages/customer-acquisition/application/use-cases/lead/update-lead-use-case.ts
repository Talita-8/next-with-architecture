import { LeadDataSourcePort, UpdateLeadDto } from "@packages/customer-acquisition";
import { LoggerProvider, UseCasePort } from "@packages/shared";

class UpdateLeadUseCase implements UseCasePort<UpdateLeadDto, void>{
    constructor(private dataSource: LeadDataSourcePort) {}

    async execute(changes: UpdateLeadDto): Promise<void> {
        const update = this.dataSource.update(changes);

        LoggerProvider.getInstance().debug(UpdateLeadUseCase.name, { changes, update });

        return update;
    }
}
export default UpdateLeadUseCase;
