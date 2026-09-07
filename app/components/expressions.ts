export type Expression = Record<string, number>

export const expressions: Record<string, Expression> = {

  neutral: {
    "cheekSquintLeft": 0.16,
    "cheekSquintRight": 0.16,
    "mouthSmile": 0.4,
    "mouthSmileLeft": 0.21,
    "mouthOpen": 0.05,
    "mouthDimpleRight": 0.41
  },

  happy: {
    "browOuterUpLeft": 0.13,
    "browOuterUpRight": 0.13,
    "cheekSquintLeft": 0.5,
    "cheekSquintRight": 0.35,
    "mouthSmile": 1,
    "mouthSmileLeft": 0.23,
    "eyeWideLeft": 0.29,
    "eyeWideRight": 0.28,
    "mouthOpen": 0.39,
    "mouthShrugUpper": 0.35
  },

  sad: {
  "eyesLookDown": 0.17,
  "browDownLeft": 1,
  "browDownRight": 1,
  "browInnerUp": 0.31,
  "eyeSquintLeft": 0.42,
  "eyeSquintRight": 0.44,
  "mouthRollUpper": 0.28,
  "mouthFrownLeft": 0.56,
  "mouthFrownRight": 0.58,
  "mouthPressLeft": 0.22,
  "mouthRollLower": 0.17,
  "mouthShrugLower": 0.11
  },

  afraid:{
  "browInnerUp": 0.61,
  "noseSneerLeft": 0.02,
  "noseSneerRight": 0.02,
  "mouthRight": 0.08,
  "mouthSmileLeft": 0.14,
  "eyeWideLeft": 0.7,
  "eyeWideRight": 0.66,
  "mouthOpen": 0.2,
  "mouthPressLeft": 0.08,
  "mouthStretchLeft": 0.13,
  "mouthStretchRight": 0.12,
  "mouthShrugUpper": 0.12,
  "viseme_E": 0.27
  },

  angry: {
  "browDownLeft": 1,
  "browDownRight": 1,
  "eyeSquintLeft": 0.22,
  "eyeSquintRight": 0.19,
  "noseSneerLeft": 0.25,
  "noseSneerRight": 0.24,
  "viseme_aa": 0.44
  },

  surprised: {
  "browInnerUp": 0.29,
  "browOuterUpLeft": 0.33,
  "browOuterUpRight": 0.33,
  "eyeWideLeft": 0.58,
  "eyeWideRight": 0.59,
  "viseme_aa": 0.26,
  "viseme_O": 0.26
  },

  disgusted: {
  "browOuterUpLeft": 0.17,
  "browOuterUpRight": 0.14,
  "eyeSquintLeft": 0.23,
  "eyeSquintRight": 0.27,
  "noseSneerLeft": 0.5,
  "noseSneerRight": 0.5,
  "mouthUpperUpLeft": 0.4,
  "mouthUpperUpRight": 0.41,
  "mouthStretchLeft": 0.29,
  "mouthStretchRight": 0.3,
  "viseme_aa": 0.16
  },

  confused: {
  "browDownLeft": 0.68,
  "browDownRight": 0.58,
  "mouthSmileLeft": 0.75,
  "eyeWideLeft": 0.19,
  "eyeWideRight": 0.17,
  "mouthUpperUpLeft": 0.25,
  "mouthUpperUpRight": 0.46,
  "mouthStretchLeft": 0.49,
  "mouthStretchRight": 0.3,
  "viseme_aa": 0.43
  },

  embarrassed: {
  "eyeLookInLeft": 0.33,
  "eyeLookOutRight": 0.32,
  "eyesLookDown": 0.2,
  "browInnerUp": 0.48,
  "browOuterUpLeft": 0.28,
  "browOuterUpRight": 0.32,
  "mouthLeft": 0.11,
  "eyeWideLeft": 0.3,
  "eyeWideRight": 0.31,
  "mouthFrownLeft": 0.11,
  "mouthFrownRight": 0.15,
  "mouthStretchLeft": 0.27,
  "mouthStretchRight": 0.27,
  "mouthLowerDownLeft": 0.09,
  "mouthLowerDownRight": 0.26,
  "jawOpen": 0.12
  },

  thinking: {
  "eyeLookInLeft": 0.2,
  "eyeLookOutRight": 0.21,
  "eyesLookUp": 0.37,
  "browDownLeft": 0.78,
  "browDownRight": 0.79,
  "browInnerUp": 0.19,
  "browOuterUpLeft": 0.44,
  "browOuterUpRight": 0.46,
  "eyeWideLeft": 0.35,
  "eyeWideRight": 0.36,
  "mouthFrownLeft": 0.07,
  "mouthFrownRight": 0.06,
  "mouthPucker": 0.31,
  "viseme_O": 0.14
  },

  proud:{
  "browOuterUpLeft": 0.4,
  "browOuterUpRight": 0.23,
  "cheekSquintLeft": 0.49,
  "cheekSquintRight": 0.43,
  "mouthSmile": 0.58,
  "mouthRight": 0.19,
  "mouthSmileLeft": 0.4,
  "mouthSmileRight": 0.27
  }

}