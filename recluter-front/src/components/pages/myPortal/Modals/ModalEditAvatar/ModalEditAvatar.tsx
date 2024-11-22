import React, { useState } from 'react'
import { Avatar, Col, Modal, Row } from 'antd'
import IconClosed from "../../../../../assets/icons/IconClosed.svg";
import IconEdit from '../../../../../assets/icons/edit2.svg';
import IconCamera from '../../../../../assets/icons/camera.svg';
import IconDelete from '../../../../../assets/icons/IconDelete.svg';
import BodyEditAvatar from './BodyEditAvatar';

const IMAGE_USER_DEFAULT = process.env.REACT_APP_IMAGE_USER_DEFAULT;

const styleText = {
  fontSize: '14px',
  color: '#006497',
  fontWeight: '600',
  fontFamily: 'Inter'
}

interface ModalEditAvatarProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  previewImage: string;
}

const ModalEditAvatar: React.FC<ModalEditAvatarProps> = ({
  visible, onClose, onEdit, previewImage
}) => {

  const [editImage, setEditImage] = useState(false);

  return (
    <>
      <Modal
        open={visible}
        // onCancel={onClose}
        footer={null}
        centered
        closable={false}
      // width={677}
      // bodyStyle={{ borderRadius: "12px" }}
      // style={{
      //   borderRadius: "12px",
      //   border: "1px solid #E1E1E2",
      //   marginTop: "15px",
      //   marginBottom: "15px",
      // }}
      // title="Foto de Perfil"
      >

        <h3
          style={{
            fontWeight: 'bold',
            fontFamily: 'Inter',
            fontSize: '24px',
            textAlign: 'center'
          }}
        >
          {
            editImage ? "Añadir foto de perfil" : "Foto de perfil"
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

        <div
          style={{
            textAlign: 'center'
          }}
          className='mb-10 mt-10'
        >
          {
            editImage ? (
              <Avatar
                shape="square"
                size={250}
                src={previewImage}
              />
            ) : <Avatar size={250} src={previewImage} />
          }

        </div>

        {
          editImage ? (
            <BodyEditAvatar
              onClose={() => setEditImage(!editImage)}
              onEdit={onEdit}
              previewImage={previewImage}
            />
          ) : (
            <>
              <Row>
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
                      onClick={() => setEditImage(!editImage)}
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

export default ModalEditAvatar