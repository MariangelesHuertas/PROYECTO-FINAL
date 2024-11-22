import React, { useState } from 'react'
import { Col, Modal, Row } from 'antd'
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import IconEdit from '../../../../assets/icons/edit2.svg';
import IconCamera from '../../../../assets/icons/camera.svg';
import IconDelete from '../../../../assets/icons/IconDelete.svg';

const BANNER_DEFAULT = process.env.REACT_APP_BANNER_DEFAULT;

interface ModalEditAvatarProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  previewImage: string;
}

const styleText = {
  fontSize: '14px',
  color: '#006497',
  fontWeight: '600',
  fontFamily: 'Inter'
}

const ModalEditBanner: React.FC<ModalEditAvatarProps> = ({
  visible, onClose, onEdit, previewImage
}) => {

  const [editImage, setEditImage] = useState(false);

  return (
    <>
      <Modal
        open={visible}
        footer={null}
        centered
        closable={false}
        width={1000}
      >
        <h3
          style={{
            fontWeight: 'bold',
            fontFamily: 'Inter',
            fontSize: '24px',
            textAlign: 'center'
          }}
          className='mb-5'
        >
          {
            editImage ? "Editar foto de Banner" : "Banner"
          }

        </h3>
        {
          editImage ? (
            <div
              style={{
                fontSize: '14px',
                fontFamily: 'Inter',
                textAlign: 'center'
              }}
              className='mt-2'
            >
              Por favor , a continuación añade una foto de perfil para que los demás puedan reconocerte.
            </div>
          ) : null
        }
        <img
          src={IconClosed}
          alt="Cerrar"
          onClick={() => {
            if (editImage) setEditImage(!editImage)
            onClose()
          }}
          style={{
            position: "absolute",
            top: "24px",
            right: "34px",
            cursor: "pointer",
            width: "24px",
            height: "24px",
          }}
        />

        <img 
          src={previewImage}
          alt="Header"
          className="w-full h-64 object-cover rounded-lg"
        />


        {
          editImage ? (
            <div></div>
          ) : (
            <>
              <Row className='mt-8'>
                <Col xxl={12} style={{ display: 'flex' }}>
                  <div
                    style={{ display: 'flex', }}
                    className='mr-5 cursor-pointer'
                  >
                    <div>
                      <img src={IconEdit} />
                    </div>
                    <div
                      style={styleText}
                      className='p-[3px]'
                      onClick={onEdit}
                    >
                      Editar
                    </div>
                  </div>

                  <div style={{ display: 'flex' }} className='cursor-pointer'>
                    <div>
                      <img src={IconCamera} />
                    </div>
                    <div style={styleText} className='p-[3px]'>
                      Añadir Foto
                    </div>
                  </div>
                </Col>
                <Col
                  xxl={12}
                >
                  <div className='cursor-pointer flex' style={{ justifyContent: 'right' }}>
                    <div>
                      <img src={IconDelete} />
                    </div>
                    <div style={styleText} className='p-[3px]'>
                      Eliminar
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )
        }

      </Modal>
    </>
  )
}

export default ModalEditBanner