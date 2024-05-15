import { motion } from "framer-motion";
import AuthHeader from "./auth-header";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

  
interface CardWrapperPropTypes {
    title: string,
    backButtonRef?: string,
    backButtonLabel?: string,
    children?: React.ReactNode,
}

const variants ={
  hidden: { opacity: 0, x: '100%', },
  visible: { opacity: 1, x: 0, },
  exit: { opacity: 0, x: '-100%', transition: { ease: "easeOut", }, },
}


const CardWrapper = ({title, children}: CardWrapperPropTypes) => {
  return (
    <motion.div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 shadow-md overflow-hidden " variants={variants} initial="hidden" animate="visible" exit="exit">
        <Card className="w-full">
          <CardHeader className="pb-2"><AuthHeader title={title}/></CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
    </motion.div>
  )
}

export default CardWrapper;