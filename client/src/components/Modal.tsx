'use client';

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Modal = ({title, open, onClose, children}: {open?:boolean, onClose?:any, title?: string, children?: React.ReactNode} ) => {

    // @ts-ignore
    return <Dialog open={open} title={title}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <Button variant='ghost' className={'p-0 m-0 block w-max h-max'} onClick={e => onClose()}><X className='h-4 w-4'/></Button>
            </DialogHeader>
            <DialogDescription>{children}</DialogDescription>
        </DialogContent>
    </Dialog>

}

export default Modal;