import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Slider } from "antd";
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { CreateSoftSkillUsuarioReducer } from "../../../../redux/actions/pages/myPortal/softSkills/PostSoftSkills";
import { GetSoftSkillsReducer } from "../../../../redux/actions/common/softSkills/SoftSkills";
import { GetSoftSkillsUReducer } from "../../../../redux/actions/pages/myPortal/softSkills/GetSoftSkills";
import ModalSaved from './ModalSavedChanges';

interface ModalEditSkillsProps {
  visible: boolean;
  onClose: () => void;
}

interface SkillData {
  id: number;
  soft_skill: string;
  valor: number;
  nivel: number;
}

const ModalEditSkills: React.FC<ModalEditSkillsProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { rex_softSkills } = useSelector((state: RootState) => state.softSkills);
  const userSoftSkills = useSelector((state: RootState) => state.getSoftSkills.rex_softSkills);
  const [skillsData, setSkillsData] = useState<SkillData[]>([]);
  const [isSavedModalVisible, setIsSavedModalVisible] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const loadSkills = useCallback(async () => {
    if (!isDataLoaded) {
      if (rex_softSkills.length === 0) {
        await dispatch(GetSoftSkillsReducer());
      }
      if (rex_softSkills.length === 0) {
      
      }
      setIsDataLoaded(true);
    }
  }, [dispatch, rex_softSkills.length, rex_softSkills.length, isDataLoaded]);

  useEffect(() => {
    if (visible && !isDataLoaded) {
      loadSkills();
    }
  }, [visible, loadSkills, isDataLoaded]);

  useEffect(() => {
    if (rex_softSkills.length > 0 && userSoftSkills) {
      const updatedSkillsData = rex_softSkills.map((skill: any) => {
        const userSkill = userSoftSkills.find((userSkill: any) => userSkill.soft_skills.id === skill.id);
        return {
          id: skill.id,
          soft_skill: skill.soft_skill,
          valor: userSkill ? userSkill.porcentaje / 10 : 0,
          nivel: userSkill ? userSkill.nivel : 0
        };
      });
      setSkillsData(updatedSkillsData);
    }
  }, [rex_softSkills, userSoftSkills]);

  const handleSliderChange = (value: number, skillId: number) => {
    setSkillsData(prevData =>
      prevData.map(skill =>
        skill.id === skillId ? { ...skill, valor: value, nivel: value } : skill
      )
    );
  };

  const handleSaveChanges = async () => {
    const softSkillsData = {
      soft_skills: skillsData
        .filter(skill => skill.valor > 0)
        .map(skill => ({
          id: skill.id,
          soft_skill: skill.soft_skill,
          porcentaje: skill.valor * 10,
          nivel: skill.nivel
        }))
    };

    try {
      const result = await dispatch(CreateSoftSkillUsuarioReducer(softSkillsData));
      if (!result.error) {
        setIsSavedModalVisible(true);
        // Actualizamos los datos de softskills del usuario
        await dispatch(GetSoftSkillsUReducer());
      } else {
        console.error("Error saving skills:", result.error);
      }
    } catch (error) {
      console.error("Error saving skills:", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleSavedModalClose = () => {
    setIsSavedModalVisible(false);
    onClose(); // Cerramos el modal principal después de cerrar el ModalSaved
  };

  if (!visible) return null;

  return (
    <>
      <Modal
        open={visible && !isSavedModalVisible}
        onCancel={handleClose}
        footer={null}
        closable={false}
        width={677}
        bodyStyle={{ borderRadius: "12px", maxHeight: 'none' }}
        style={{ top: 20, marginBottom: '20px' }}
      >
        <img
          src={IconClosed}
          alt="Cerrar"
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "34px",
            right: "34px",
            cursor: "pointer",
            width: "24px",
            height: "24px",
          }}
        />

        <div className="text-center mx-[86px] mb-[51px] mt-[21px]">
          <h3 className="mt-[16px] mx-[44px] text-heading-md font-bold">
            Mis habilidades
          </h3>
          <p className="font-medium px-[55px] text-body-sm mt-[10px]">
            Por favor, a continuación edita tu información
          </p>
        </div>

        <div className="mx-[47px] mb-[32px]">
          {skillsData.map((skill) => (
            <div key={skill.id} className="mb-4">
              <div className="flex justify-between w-full mb-2">
                <span className="text-gray font-medium text-body-sm">{skill.soft_skill}</span>
                <span className="text-gray font-medium text-body-sm">Nivel: {skill.nivel}</span>
              </div>
              <div className='bg-[#F7F7F7] h-[44px] content-center mb-[8px]'>
                <Slider
                  value={skill.valor}
                  onChange={(value) => handleSliderChange(value, skill.id)}
                  min={0}
                  max={10}
                  step={1}
                  trackStyle={{ backgroundColor: '#007AFF', height: 4 }}
                  railStyle={{ backgroundColor: '#E3E3E4', height: 4 }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-[40px] mb-[35px]">
          <Button
            onClick={handleClose}
            className="principal-nav-notify-buttonG w-[118px] h-[44px]"
            style={{ marginRight: "8px", borderRadius: "4px" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveChanges}
            className="w-[181px] h-[44px] ml-[18px] rounded-[4px] bg-blue3 principal-nav-notify-button2 text-white cursor-pointer"
          >
            Guardar cambios
          </Button>
        </div>
      </Modal>

      <ModalSaved
        visible={isSavedModalVisible}
        onClose={handleSavedModalClose}
      />
    </>
  );
};

export default ModalEditSkills;