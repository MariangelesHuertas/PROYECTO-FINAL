import React, { useState, useEffect } from 'react';
import { Modal, Divider, Tooltip, Button, message } from 'antd';
import IconClosed from '../../../assets/icons/IconClosed.svg';
import IconCopy from '../../../assets/icons/IconCopy.svg';
import InputC from '../../pages/offers/KillerQuestions/ComponentsKillersQ/Input';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { editValuationLinkReducer } from '../../../redux/actions/pages/myPortal/QR/EditValuationLink';
import { QRCodeSVG } from 'qrcode.react'; 

const BASE_URL_EXACT = process.env.REACT_APP_BASE_URL_EXACT;

interface ValuationModalProps {
  visible: boolean;
  onClose: () => void;
  editLink?: boolean;
  link: string;
}

const ValuationModal: React.FC<ValuationModalProps> = ({
  visible,
  onClose,
  editLink = false,
  link
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { rex_editing, rex_editSuccess, rex_editError, rex_valuationLink } = useSelector((state: RootState) => state.editValuationLink);

  const [copied, setCopied] = useState(false);
  const [linkVal, setLinkVal] = useState(BASE_URL_EXACT + "/" + link);
  const [editablePart, setEditablePart] = useState(link);
  const [isLinkEdited, setIsLinkEdited] = useState(false);

  useEffect(() => {
    if (!editLink) {
      setLinkVal(BASE_URL_EXACT + "/" + link);
    } else {
      setEditablePart(link);
    }
  }, [editLink, link]);

  useEffect(() => {
    if (rex_editSuccess) {
      const newLink = rex_valuationLink || editablePart;
      setEditablePart(newLink);
      setLinkVal(BASE_URL_EXACT + "/" + newLink);
      setIsLinkEdited(false);
      message.success('Link de valoración actualizado con éxito');
    }
  }, [rex_editSuccess, rex_valuationLink]);

  useEffect(() => {
    if (rex_editError) {
      message.error('Error al actualizar el link de valoración: ' + rex_editError);
    }
  }, [rex_editError]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditablePartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditablePart(e.target.value);
    setIsLinkEdited(true);
  };

  const handleSaveChanges = async () => {
    if (editablePart !== link) {
      try {
        await dispatch(editValuationLinkReducer(editablePart));
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
      }
    } else {
      message.info('No se han realizado cambios en el link');
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      width={677}
      bodyStyle={{
        padding: '0px',
        position: 'relative',
      }}
      style={{
        borderRadius: '12px',
      }}
    >
      <img
        src={IconClosed}
        alt="Cerrar"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '8px',
          right: '16px',
          cursor: 'pointer',
          width: '24px',
          height: '24px'
        }}
      />

      <div className="mb-[46px]">
        <div className='mt-[15px] mx-[68px] text-center'>
          <h2 className="text-heading-md font-bold">Invita a alguien a que haga una valoración</h2>
          <div className="my-[38px] mx-auto" style={{ width: '152px', height: '181px' }}>
            <QRCodeSVG  // Cambiado aquí
              value={linkVal}
              size={152}
              level={"H"}
              includeMargin={true}
            />
          </div>
          <p className='font-medium text-body-md'>¡Escanea y comparte tu QR para que puedan valorarte!</p>
        </div>
        <Divider className="bg-gray-300" />
        <div className="mt-[37px] mx-[52px] ">
          <h3 className="text-heading-x1 font-medium text-[#BC9C9C] mb-[14px]">Nueva valoración</h3>
          <div className="relative">
            {editLink ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className='mr-[5px] text-body-md text-black font-medium'>{BASE_URL_EXACT}/</span>
                <InputC
                  value={editablePart}
                  onChange={handleEditablePartChange}
                  style={{
                    flexGrow: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
              </div>
            ) : (
              <Tooltip title={linkVal} placement="top">
                <InputC
                  value={linkVal}
                  readOnly
                  style={{
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
              </Tooltip>
            )}
            {!editLink && (
              <div
                onClick={handleCopyLink}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span className="mr-[12px] text-green12 text-body-md font-medium">Copiar enlace</span>
                <img src={IconCopy} alt="Copiar" style={{ width: '20px', height: '20px' }} />
              </div>
            )}
          </div>
          {copied && <p className="text-green-500 text-sm mt-2">¡Enlace copiado!</p>}
        </div>
        <div className="flex justify-center mt-[40px]">
        {editLink && (
          <Button
            disabled={!isLinkEdited || rex_editing}
            onClick={handleSaveChanges}
            className={`w-[181px] h-[44px] ml-[18px] rounded-[4px] 
              ${!isLinkEdited || rex_editing
                ? 'bg-[#F4F4F5] text-[#757575] font-semibold text-body-md cursor-not-allowed'
                : 'bg-blue3 principal-nav-notify-button2 text-white cursor-pointer'
              }
            `}
          >
            {rex_editing ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        )}
      </div>
      </div>
    </Modal>
  );
};

export default ValuationModal;