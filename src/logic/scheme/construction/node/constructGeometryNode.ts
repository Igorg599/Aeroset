import {Scene} from "@babylonjs/core/scene";
import {Color3, Mesh, MeshBuilder, StandardMaterial} from "@babylonjs/core";

export const constructGeometryNode = (scene: Scene, nodeId: string): Mesh | null => {
    const mesh = MeshBuilder.CreateSphere(`sphere, id=${nodeId}`,
        {
            diameter: 0.15,
            updatable : true
        }, scene);

    const material = new StandardMaterial("box_mat2", scene)
    material.alpha = 0.5;
    material.diffuseColor = new Color3(0.5, 1, 0.5);
    mesh.material = material

    return  mesh
}

export default constructGeometryNode