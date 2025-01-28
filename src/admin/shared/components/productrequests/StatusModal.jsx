// import React from 'react';
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem} from "@nextui-org/react";

// const StatusModal = ({ 
//   isOpen, 
//   onClose, 
//   selectedProduct, 
//   onStatusUpdate, 
//   loading 
// }) => {
//   const [selectedStatus, setSelectedStatus] = React.useState(selectedProduct?.Product_Status || '');

//   const statusOptions = [
//     { label: 'Pending', value: 'Pending' },
//     { label: 'In Progress', value: 'In Progress' },
//     { label: 'Completed', value: 'Completed' },
//     { label: 'Rejected', value: 'Rejected' }
//   ];

//   const handleUpdate = () => {
//     onStatusUpdate(selectedStatus);
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size="md">
//       <ModalContent>
//         <ModalHeader className="flex flex-col gap-1">Update Product Status</ModalHeader>
//         <ModalBody>
//           <div className="space-y-4">
//             <div className="p-4 rounded-lg bg-zinc-50">
//               <div className="text-sm text-zinc-600">
//                 <div className="mb-2">
//                   <span className="font-medium">Email:</span> {selectedProduct?.Email}
//                 </div>
//                 <div>
//                   <span className="font-medium">Request:</span> {selectedProduct?.query}
//                 </div>
//               </div>
//             </div>

//             <Select
//               label="Update Status"
//               selectedKeys={selectedStatus ? [selectedStatus] : []}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="w-full"
//             >
//               {statusOptions.map((status) => (
//                 <SelectItem key={status.value} value={status.value}>
//                   {status.label}
//                 </SelectItem>
//               ))}
//             </Select>
//           </div>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="danger" variant="light" onPress={onClose}>
//             Cancel
//           </Button>
//           <Button 
//             color="primary" 
//             onPress={handleUpdate}
//             isLoading={loading}
//             isDisabled={!selectedStatus || selectedStatus === selectedProduct?.Product_Status}
//           >
//             Update Status
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default StatusModal;

import React from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem} from "@nextui-org/react";

const StatusModal = ({ 
  isOpen, 
  onClose, 
  selectedProduct, 
  onStatusUpdate, 
  loading 
}) => {
  // Initialize status from selected product when modal opens
  React.useEffect(() => {
    if (selectedProduct?.Product_Status) {
      setSelectedStatus(selectedProduct.Product_Status);
    }
  }, [selectedProduct]);

  const [selectedStatus, setSelectedStatus] = React.useState('');

  const statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Rejected', value: 'Rejected' }
  ];

  const handleUpdate = () => {
    if (selectedProduct?._id && selectedStatus) {
      onStatusUpdate(selectedStatus, selectedProduct);
    }
  };

  const handleClose = () => {
    setSelectedStatus(''); // Reset state on close
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Update Product Status</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-zinc-50">
              <div className="text-sm text-zinc-600">
                <div className="mb-2">
                  <span className="font-medium">Email:</span> {selectedProduct?.Email}
                </div>
                <div>
                  <span className="font-medium">Request:</span> {selectedProduct?.query}
                </div>
              </div>
            </div>

            <Select
              label="Update Status"
              selectedKeys={selectedStatus ? [selectedStatus] : []}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full"
            >
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleClose}>
            Cancel
          </Button>
          <Button 
            color="primary" 
            onPress={handleUpdate}
            isLoading={loading}
            isDisabled={!selectedStatus || selectedStatus === selectedProduct?.Product_Status}
          >
            Update Status
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StatusModal;