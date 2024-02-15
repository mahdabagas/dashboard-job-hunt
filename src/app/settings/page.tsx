import OverviewForm from "@/components/forms/OverviewForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";

interface SettingsPageProps {}

const SettingsPage: FC<SettingsPageProps> = ({}) => {
  return (
    <div>
      <h1 className="font-semibold text-3xl mb-5">Settings</h1>

      <Tabs defaultValue="overview">
        <TabsList className=" mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="socialLinks">Social Links</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewForm />
        </TabsContent>
        <TabsContent value="socialLinks">
          <div>Social Links</div>
        </TabsContent>
        <TabsContent value="teams">
          <div>Teams</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
