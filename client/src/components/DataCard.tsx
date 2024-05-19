

import { CardPropsType } from "@/types";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


const DataCard = ({name, value, icon: Icon}: CardPropsType) => {
  return (
    <Card className="flex-1 shadow px-6 py-8 relative">
      <Icon size={24} className="absolute right-3 top-3"/>
      <CardHeader className="p-0">
        <CardDescription>{name}</CardDescription>
        <CardTitle>{value}</CardTitle>
      </CardHeader>
      
    </Card>
  )
}

export default DataCard
