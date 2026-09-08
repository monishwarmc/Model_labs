export type Expression = Record<string, number>

export const expressions: Record<string, Expression> = {

  normal: {
    "mouthSmile": 0.23
  },

  happy: {
    "mouthSmile": 0.78,
    "mouthOpen": 0.2,
    "viseme_E": 0.45
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
    "viseme_aa": 0.14
  },

  angry: {
  "browDownLeft": 1,
    "browDownRight": 1,
    "eyeSquintLeft": 0.22,
    "eyeSquintRight": 0.19,
    "noseSneerLeft": 0.25,
    "noseSneerRight": 0.24
  },

  surprised: {
  "browInnerUp": 0.29,
    "browOuterUpLeft": 0.33,
    "browOuterUpRight": 0.33,
    "eyeWideLeft": 0.58,
    "eyeWideRight": 0.59,
    "viseme_aa": 0.52,
    "viseme_E": 0.53
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
  "browDownLeft": 0.39,
    "browDownRight": 0.4,
    "browInnerUp": 0.29,
    "eyeSquintRight": 0.27,
    "mouthUpperUpLeft": 0.48,
    "mouthUpperUpRight": 0.46,
    "mouthStretchLeft": 0.67,
    "mouthStretchRight": 0.65,
    "jawOpen": 0.22
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
    "browInnerUp": 0.19,
    "browOuterUpLeft": 0.48,
    "browOuterUpRight": 0.51,
    "eyeWideLeft": 0.35,
    "eyeWideRight": 0.36,
    "viseme_O": 0.18,
    "viseme_U": 0.15
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