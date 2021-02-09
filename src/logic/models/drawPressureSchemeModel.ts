import {Scene} from "@babylonjs/core/scene";
import PressureModel from "../../data/models/pressure/PressureModel";
import {SchemeUI} from "../../data/ui/SchemeUI";
import {Color3, Mesh} from "@babylonjs/core";
import {GradientMaterial} from "@babylonjs/materials";
import ColorGradientService from "../../services/colorGradient/GradientService";
import _ from 'lodash';

export const drawPressureSchemeModelAsync = async (model: PressureModel, scene: Scene, ui: SchemeUI, gradientService: ColorGradientService): Promise<void> => {

    const gradientMaterialBase = new GradientMaterial("grad", scene);

    for (const rib of ui.ribs) {
        const ribMesh: Mesh = rib.mesh;
        const node1Id = rib.node1Id;
        const node2Id = rib.node2Id;

        const node1Value = model.values.find(v => v.nodeId === node1Id)!.value;
        const node2Value = model.values.find(v => v.nodeId === node2Id)!.value;

        gradientService.setMinParameter(model.parameterMin);
        gradientService.setMaxParameter(model.parameterMax);

        const node1Color = gradientService.getColor(node1Value);
        const node2Color = gradientService.getColor(node2Value);

        const gradientMaterial = gradientMaterialBase.clone("d");
        gradientMaterial.topColor = new Color3(node1Color.Red / 255, node1Color.Green / 255, node1Color.Blue / 255);
        gradientMaterial.bottomColor = new Color3(node2Color.Red / 255, node2Color.Green / 255, node2Color.Blue / 255);

        gradientMaterial.offset = 0.5;
        gradientMaterial.smoothness = 1;

        ribMesh.material = gradientMaterial;
    }
}