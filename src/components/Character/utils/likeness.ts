import * as THREE from "three";

// Runtime recolours that make the stock character resemble Bharat:
// wheatish skin, black hair, a teal shirt and black shoes.
const SKIN_COLOR = "#d49b74";
// the head mesh carries darkening vertex colours, so it needs a lighter tint
const FACE_COLOR = "#e9b088";
const SKIN_MESHES = ["Plane007", "Neck", "Ear001", "Hand"];

const MESH_COLORS: Record<string, { color: string; roughness: number }> = {
  hair: { color: "#0b0b0b", roughness: 0.9 },
  BODYSHIRT: { color: "#0f766e", roughness: 0.7 },
  Shoe: { color: "#0d0d0d", roughness: 0.6 },
  Sole: { color: "#262626", roughness: 0.8 },
};

const recolor = (
  character: THREE.Object3D,
  name: string,
  color: string,
  roughness: number
) => {
  const mesh = character.getObjectByName(name) as THREE.Mesh | undefined;
  if (!mesh) return;
  const material = (mesh.material as THREE.MeshStandardMaterial).clone();
  material.color.set(color);
  material.roughness = roughness;
  mesh.material = material;
};

const applyLikeness = (character: THREE.Object3D) => {
  SKIN_MESHES.forEach((name) =>
    recolor(character, name, name === "Plane007" ? FACE_COLOR : SKIN_COLOR, 0.8)
  );
  Object.entries(MESH_COLORS).forEach(([name, { color, roughness }]) =>
    recolor(character, name, color, roughness)
  );
};

export default applyLikeness;
