"use client";

import * as THREE from "three";
import { useEffect, useRef, useMemo } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";
import { useControls, button, folder } from "leva";
import { useCharacter, ActionName, FACIAL_EXPRESSIONS } from "@/app/context/CharacterContext";

type LevaControlValue = number | string;
type Schema = Parameters<typeof folder>[0];

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

const ALL_ANIMATIONS: (ActionName | "none")[] = [
  "none",
  "breathing_idle_standing",
  "waving_hand_gesture(hello)",
  "walking",
  "Stretching_arms",
  "sitting_on_chair",
  "Sitting_down_on_floor_pose",
  "showing_the_background-hand_gesture",
  "saluting_hand_gesture",
  "Sad_disappointed_action",
  "Running",
  "Knee_down_pose",
  "Jumping",
  "fist_pumping_hand-gesture",
  "Fighting_pose",
  "Dismissing_hand_gesture",
  "Dancing",
  "crouch_sitting_pose",
  "Agreeing",
  "Acknowledging",
];

export function Monishwar(props: ThreeElements["group"]) {
  const group = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF("models/monishwar-animations.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const { mixer } = useAnimations(animations, clone);
  const { animation, setAnimation, facialExpression, isThinking } = useCharacter();

  const lastNodOffsetRef = useRef<number>(0);
  const morphMeshesRef = useRef<THREE.SkinnedMesh[]>([]);
  const bonesMapRef = useRef<Record<string, THREE.Bone>>({});

  const { boneList, morphCategories, boneCategories, morphs, bones, initialRotations } = useMemo(() => {
    const morphs: THREE.SkinnedMesh[] = [];
    const bones: Record<string, THREE.Bone> = {};
    const initialRots: Record<string, THREE.Euler> = {};
    const names: string[] = [];

    const categories = {
      eyes: [] as string[],
      brows: [] as string[],
      mouth: [] as string[],
      teeth: [] as string[],
      others: [] as string[],
    };

    clone.traverse((child) => {
      if ((child as THREE.SkinnedMesh).isMesh && (child as THREE.SkinnedMesh).morphTargetDictionary) {
        const mesh = child as THREE.SkinnedMesh;
        morphs.push(mesh);

        Object.keys(mesh.morphTargetDictionary!).forEach((key) => {
          const lower = key.toLowerCase();
          if (/eye|blink|squint|look/.test(lower)) {
            if (!categories.eyes.includes(key)) categories.eyes.push(key);
          } else if (/brow/.test(lower)) {
            if (!categories.brows.includes(key)) categories.brows.push(key);
          } else if (/mouth|jaw|lip|cheek|pucker|smile|frown|funnel/.test(lower)) {
            if (!categories.mouth.includes(key)) categories.mouth.push(key);
          } else if (/teeth|tongue/.test(lower)) {
            if (!categories.teeth.includes(key)) categories.teeth.push(key);
          } else {
            if (!categories.others.includes(key)) categories.others.push(key);
          }
        });
      }

      if ((child as THREE.Bone).isBone) {
        const bone = child as THREE.Bone;
        bones[bone.name] = bone;
        names.push(bone.name);
        initialRots[bone.name] = bone.rotation.clone();
      }
    });

    const torso: string[] = [];
    const leftArm: string[] = [];
    const rightArm: string[] = [];
    const leftLeg: string[] = [];
    const rightLeg: string[] = [];
    const others: string[] = [];

    names.forEach((name) => {
      const lower = name.toLowerCase();
      if (/leftarm|leftforearm|lefthand|leftshoulder|leftinhand|leftfinger/.test(lower)) {
        leftArm.push(name);
      } else if (/rightarm|rightforearm|righthand|rightshoulder|rightinhand|rightfinger/.test(lower)) {
        rightArm.push(name);
      } else if (/leftupleg|leftleg|leftfoot|lefttoe/.test(lower)) {
        leftLeg.push(name);
      } else if (/rightupleg|rightleg|rightfoot|righttoe/.test(lower)) {
        rightLeg.push(name);
      } else if (/hip|spine|neck|head/.test(lower)) {
        torso.push(name);
      } else {
        others.push(name);
      }
    });

    return {
      boneList: names,
      morphCategories: categories,
      boneCategories: { torso, leftArm, rightArm, leftLeg, rightLeg, others },
      morphs,
      bones,
      initialRotations: initialRots,
    };
  }, [clone]);

  useEffect(() => {
    morphMeshesRef.current = morphs;
    bonesMapRef.current = bones;
  }, [morphs, bones]);

  const levaSchema = useMemo<Schema>(() => {
    const createMorphSchema = (keys: string[]): Schema => {
      const schema: Schema = {};
      keys.forEach((k) => {
        schema[k] = { value: 0, min: 0, max: 1, step: 0.01 };
      });
      return schema;
    };

    const createBoneFolderSchema = (boneNames: string[]): Schema => {
      const folderSchema: Schema = {};
      boneNames.forEach((bName) => {
        folderSchema[bName] = folder({
          [`${bName}_rotX`]: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01, label: "Rot X" },
          [`${bName}_rotY`]: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01, label: "Rot Y" },
          [`${bName}_rotZ`]: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01, label: "Rot Z" },
        });
      });
      return folderSchema;
    };

    const schema: Schema = {
      "Body Animations": folder({
        selectAnimation: {
          value: animation || "none",
          options: ALL_ANIMATIONS,
          onChange: (val: ActionName | "none") => {
            if (val && val !== animation) {
              setAnimation(val as ActionName);
            }
          },
        },
      }),
    };

    if (boneCategories.torso.length) schema["Bones: Torso & Head"] = folder(createBoneFolderSchema(boneCategories.torso));
    if (boneCategories.leftArm.length) schema["Bones: Left Arm"] = folder(createBoneFolderSchema(boneCategories.leftArm));
    if (boneCategories.rightArm.length) schema["Bones: Right Arm"] = folder(createBoneFolderSchema(boneCategories.rightArm));
    if (boneCategories.leftLeg.length) schema["Bones: Left Leg"] = folder(createBoneFolderSchema(boneCategories.leftLeg));
    if (boneCategories.rightLeg.length) schema["Bones: Right Leg"] = folder(createBoneFolderSchema(boneCategories.rightLeg));
    if (boneCategories.others.length) schema["Bones: Other / Accessories"] = folder(createBoneFolderSchema(boneCategories.others));

    if (morphCategories.eyes.length) schema["Eye Morphs"] = folder(createMorphSchema(morphCategories.eyes));
    if (morphCategories.brows.length) schema["Brow Morphs"] = folder(createMorphSchema(morphCategories.brows));
    if (morphCategories.mouth.length) schema["Mouth & Jaw Morphs"] = folder(createMorphSchema(morphCategories.mouth));
    if (morphCategories.teeth.length) schema["Teeth & Tongue Morphs"] = folder(createMorphSchema(morphCategories.teeth));
    if (morphCategories.others.length) schema["Other Morphs"] = folder(createMorphSchema(morphCategories.others));

    return schema;
  }, [morphCategories, boneCategories, animation, setAnimation]);

  const [controls, setControls] = useControls(
    "Avatar Controls Inspector",
    () => levaSchema,
    [levaSchema]
  );

  useControls("Avatar Controls Inspector", {
    "Reset All Controls": button(() => {
      const resetMap: Record<string, LevaControlValue> = {
        selectAnimation: "none",
      };

      const categories = [
        ...morphCategories.eyes,
        ...morphCategories.brows,
        ...morphCategories.mouth,
        ...morphCategories.teeth,
        ...morphCategories.others,
      ];

      categories.forEach((key) => {
        resetMap[key] = 0;
      });

      boneList.forEach((bName) => {
        resetMap[`${bName}_rotX`] = 0;
        resetMap[`${bName}_rotY`] = 0;
        resetMap[`${bName}_rotZ`] = 0;
      });

      setControls(resetMap);
      setAnimation("none" as ActionName);
    }),
    "Log Expression JSON": button(() => {
      const activeValues: Record<string, number> = {};

      clone.traverse((child) => {
        const mesh = child as THREE.SkinnedMesh;
        if (mesh.isMesh && mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
          Object.entries(mesh.morphTargetDictionary).forEach(([name, idx]) => {
            const val = mesh.morphTargetInfluences![idx];
            if (val > 0.01) {
              activeValues[name] = Number(val.toFixed(2));
            }
          });
        }
      });

      console.log("Exported Expression Object:", JSON.stringify(activeValues, null, 2));
    }),
  });

  // Handle animation playback via AnimationMixer
  useEffect(() => {
    if (!mixer) return;

    if (!animation || (animation as string) === "none") {
      mixer.stopAllAction();
      return;
    }

    const matchedClip = animations.find(
      (a) =>
        a.name.toLowerCase() === animation.toLowerCase() ||
        a.name.toLowerCase().includes(animation.toLowerCase())
    );

    if (!matchedClip) return;

    const currentAction = mixer.clipAction(matchedClip);

    if (currentAction) {
      mixer.stopAllAction();
      currentAction.reset();

      const isFreezePose =
        animation.includes("sitting") ||
        animation.includes("Sitting") ||
        animation.includes("pose") ||
        animation.includes("Knee_down");

      if (isFreezePose) {
        currentAction.setLoop(THREE.LoopOnce, 1);
        currentAction.clampWhenFinished = true;
      } else {
        currentAction.setLoop(THREE.LoopRepeat, Infinity);
        currentAction.clampWhenFinished = false;
      }

      currentAction.fadeIn(0.3).play();

      return () => {
        currentAction.fadeOut(0.3);
      };
    }
  }, [animation, animations, mixer]);

  useFrame((state, delta) => {
    const activePreset = isThinking
      ? FACIAL_EXPRESSIONS.thinking
      : FACIAL_EXPRESSIONS[facialExpression] || {};

    const typedControls = controls as unknown as Record<string, number>;
    const meshes = morphMeshesRef.current;
    const bonesMap = bonesMapRef.current;

    // Apply Morph Targets
    meshes.forEach((mesh) => {
      if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) return;

      Object.keys(mesh.morphTargetDictionary).forEach((name) => {
        const targetIdx = mesh.morphTargetDictionary![name];
        if (targetIdx !== undefined) {
          const manualVal = typeof typedControls[name] === "number" ? typedControls[name] : 0;
          const targetVal = manualVal !== 0 ? manualVal : activePreset[name] || 0;

          mesh.morphTargetInfluences![targetIdx] = THREE.MathUtils.lerp(
            mesh.morphTargetInfluences![targetIdx],
            targetVal,
            delta * 8
          );
        }
      });
    });

    // Apply Bone Rotations relative to initial rest pose
    boneList.forEach((bName) => {
      const bone = bonesMap[bName];
      const initRot = initialRotations[bName];
      if (!bone || !initRot) return;

      const curX = typeof typedControls[`${bName}_rotX`] === "number" ? typedControls[`${bName}_rotX`] : 0;
      const curY = typeof typedControls[`${bName}_rotY`] === "number" ? typedControls[`${bName}_rotY`] : 0;
      const curZ = typeof typedControls[`${bName}_rotZ`] === "number" ? typedControls[`${bName}_rotZ`] : 0;

      if (!animation || (animation as string) === "none") {
        bone.rotation.x = initRot.x + curX;
        bone.rotation.y = initRot.y + curY;
        bone.rotation.z = initRot.z + curZ;
      } else {
        if (curX !== 0) bone.rotation.x += curX;
        if (curY !== 0) bone.rotation.y += curY;
        if (curZ !== 0) bone.rotation.z += curZ;
      }
    });

    // Thinking nod offset
    const targetNod = isThinking ? Math.sin(state.clock.elapsedTime * 6) * 0.08 + 0.05 : 0;
    const deltaNod = targetNod - lastNodOffsetRef.current;

    if (deltaNod !== 0) {
      const headBone = bonesMap["Head"] || bonesMap["head"];
      if (headBone) {
        headBone.rotation.x += deltaNod;
      }
    }
    lastNodOffsetRef.current = targetNod;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={clone} />
    </group>
  );
}

useGLTF.preload("models/monishwar-animations.glb");