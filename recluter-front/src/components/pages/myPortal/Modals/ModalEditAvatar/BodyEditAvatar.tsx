import React from 'react'

interface BodyEditAvatarProps {
  onClose: () => void;
  onEdit: () => void;
  previewImage: string;
}

const BodyEditAvatar: React.FC<BodyEditAvatarProps> = ({
  onClose, onEdit, previewImage
}) => {

  return (
    <>

      <div
        className='flex'
        style={{
          justifyContent: "center"
        }}
      >
        <div
          style={{
            background: '#FCFCFC',
            width: '163px',
            height: '44px',
            border: '1px solid #E1E1E2',
            borderRadius: '5px',
            alignContent: 'center',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'Inter'
          }}
          className='mr-7 cursor-pointer'
        >
          Usar la cámara
        </div>
        <div
          style={{
            background: '#006497',
            width: '163px',
            height: '44px',
            borderRadius: '5px',
            alignContent: 'center',
            textAlign: 'center',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'Inter'
          }}
          className='cursor-pointer'
          onClick={onEdit}
        >
          Cargar foto
        </div>
      </div >
      <div
        style={{
          fontSize: '14px',
          fontFamily: 'Inter',
          textAlign: 'center'
        }}
        className='mt-5'
      >
        *La imágen debe tener  400 píxeles de ancho y 150 píxeles de alto
      </div>
    </>
  )
}

export default BodyEditAvatar