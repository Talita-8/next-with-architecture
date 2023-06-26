import { useMutation } from "@/modules/shared";
import { updateLeadUseCase } from "@/modules/customer-acquisition/main";
import { UpdateLeadDto } from "@packages/customer-acquisition";

const useUpdateLead = () => {
    return useMutation<UpdateLeadDto, void>(
        updateLeadUseCase.execute.bind(updateLeadUseCase)
    )
}

export default useUpdateLead;
