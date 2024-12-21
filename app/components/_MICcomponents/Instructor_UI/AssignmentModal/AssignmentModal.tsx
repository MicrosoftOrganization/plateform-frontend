import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import DOMPurify from 'dompurify'

export default function AssignmentModal({
  isOpen,
  onOpenChange,
  DueDate,
  Description,
  Title,
  assignmentId
}) {
  return (
    <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}
    >
      <ModalContent>
        {/* En-tête centré */}
        <ModalHeader className='flex flex-col bg-gradient-to-r from-secondary to-primary text-white'>
              Assignment Details
            </ModalHeader>
        {/* Corps du modal avec max-height */}
        <ModalBody
          className="p-6 text-gray-700"
          style={{
            maxHeight: '80vh', 
            overflowY: 'auto', 
          }}
        >
          {/* Titre et date centrés */}
          <div className="flex flex-col items-center mb-4">
            <h6 className="text-lg font-bold text-blue-600">{Title}</h6>
            <h6 className="text-lg font-bold text-red-600">{DueDate}</h6>
          </div>

          {/* Description avec style propre */}
          <div
            className="richtext-container p-4 border rounded-md bg-gray-50"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(Description),
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
