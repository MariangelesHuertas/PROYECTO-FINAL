import React, { useState, useEffect, useCallback, useRef } from "react";
import { Modal, Button } from "antd";
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import CustomTag from "../../offers/CreateOffers/CustomTag";
import SelectBox from "../SelectBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { GetSoftSkillsReducer } from "../../../../redux/actions/common/softSkills/SoftSkills";
import { GetSkillsReducer } from "../../../../redux/actions/common/skills/Skills";

interface ModalAddSkillsProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (newItems: string[]) => void;
  existingSkills: string[];
  isAptitude?: boolean;
}

const ModalAddSkills: React.FC<ModalAddSkillsProps> = ({ 
  visible, 
  onClose, 
  onAdd, 
  existingSkills, 
  isAptitude = false 
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { rex_softSkills } = useSelector((state: RootState) => state.softSkills);
  const { rex_skills } = useSelector((state: RootState) => state.skills);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) setSelectedItems([]);
  }, [visible]);

  const debouncedSearch = useCallback((search: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      if (isAptitude) {
        dispatch(GetSkillsReducer(search, 1, 5));
      } else {
        dispatch(GetSoftSkillsReducer(search, 1, 5));
      }
    }, 300); // 300ms delay
  }, [isAptitude, dispatch]);

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    debouncedSearch(search);
  };

  const handleItemSelect = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems(prev => [...prev, value]);
    }
  };

  const handleItemRemove = (item: string) => {
    setSelectedItems(prev => prev.filter(i => i !== item));
  };

  const handleSave = () => {
    onAdd(selectedItems);
    onClose();
  };

  const items = isAptitude ? rex_skills : rex_softSkills;
  const itemType = isAptitude ? "aptitud" : "habilidad";

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      width={677}
      bodyStyle={{ borderRadius: "12px" }}
      style={{ borderRadius: "12px", border: "1px solid #E1E1E2", marginTop: "15px", marginBottom: "15px" }}
    >
      <img
        src={IconClosed}
        alt="Cerrar"
        onClick={onClose}
        style={{
          position: "absolute",
          top: "34px",
          right: "34px",
          cursor: "pointer",
          width: "24px",
          height: "24px",
        }}
      />

      <div className="text-center mx-[86px] mb-[36px] mt-[20px]">
        <h3 className="mt-[16px] mx-[44px] text-heading-md font-bold">
          Añadir {itemType}s
        </h3>
        <p className="font-medium px-[55px] text-body-sm mt-[10px]">
          Por favor, a continuación ingresa la {itemType} que deseas añadir
        </p>
      </div>

      <div className="mx-[86px] mb-[32px] mt-[24px]">
        <span className="text-body-md text-[#757575] font-medium">
          {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
        </span>

        <SelectBox
          placeholder={`Seleccionar ${itemType}s`}
          options={items.map((item: any) => ({
            value: isAptitude ? item.aptitud : item.soft_skill,
            label: isAptitude ? item.aptitud : item.soft_skill,
          }))}
          onSearch={handleSearch}
          onChange={handleItemSelect}
          className="Input-Filter-Employment w-full mt-[16px] rounded-[12px] custom-input-company px-1"
        />

        <div className="flex flex-wrap mt-4">
          {selectedItems.map((item) => (
            <CustomTag
              key={item}
              text={item}
              onClose={() => handleItemRemove(item)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-[40px]">
          <Button
            onClick={onClose}
            className="principal-nav-notify-buttonG w-[118px] h-[44px]"
            style={{ marginRight: "8px", borderRadius: "4px" }}
          >
            Cancelar
          </Button>
          <Button
            disabled={selectedItems.length === 0}
            onClick={handleSave}
            className={`w-[181px] h-[44px] ml-[18px] rounded-[4px] ${
              selectedItems.length === 0
                ? "bg-[#F4F4F5] text-[#757575] font-semibold text-body-md cursor-not-allowed"
                : "bg-blue3 principal-nav-notify-button2 text-white cursor-pointer"
            }`}
          >
            Guardar cambios
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddSkills;