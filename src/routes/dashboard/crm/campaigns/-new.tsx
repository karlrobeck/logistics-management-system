import React from "react";
import { Route } from ".";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/form";
import { CreateCrmCampaignForm } from "@/forms/crm";
import { CreateCrmCampaignInput, useMutation } from "@/gqty";
import { toast } from "sonner";

const NewCampaignForm = () => {
  const navigate = Route.useNavigate();
  const searchQuery = Route.useSearch();

  const [createCampaign] = useMutation<void, CreateCrmCampaignInput>(
    (mutation, args) => {
      const createCampaign = mutation.createCrmCampaign({
        createCrmCampaign: args,
      });

      createCampaign.id;
    },
  );

  const form = useAppForm({
    defaultValues: {} as CreateCrmCampaignInput,
    onSubmit: async ({ value }) => {
      toast.promise(createCampaign({ args: value }), {
        success: "Campaign Created Succesfully",
        finally: () => {
          navigate({ search: (prev) => ({ ...prev, newCampaign: undefined }) });
        },
      });
    },
  });

  return (
    <Dialog
      open={searchQuery.newCampaign}
      onOpenChange={(_) =>
        navigate({ search: (prev) => ({ ...prev, newCampaign: undefined }) })}
    >
      <DialogContent className="!max-w-1/2 max-h-3/4 overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle>Create a Campaign</DialogTitle>
        </DialogHeader>
        <form
          className="grid grid-cols-4 gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <CreateCrmCampaignForm form={form} />
            <form.SubmitButton>Create Campaign</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCampaignForm;
