
  import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
  
  interface ConfirmEndTripModalProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  export const ConfirmEndTripModal = ({ open, onConfirm, onCancel }: ConfirmEndTripModalProps) => (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Finalizar viaje?</DialogTitle>
          <DialogDescription>
            Esta acción finalizará el viaje actual. ¿Estás seguro de que deseas continuar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
          <Button onClick={onConfirm} className="bg-destructive text-white">Sí, finalizar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  