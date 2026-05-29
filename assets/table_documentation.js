const PROFILE_TYPES = [
    "condensation",
    "subvortexcondensation",
    "mesocyclone",
    "hurricane",
    "dustdevil",
    "landspoutlayer",
    "debris",
    "curtains",
    "stormcloud",
    "rainsheet",
    "rain",
    "snow",
    "cloud",
    "sandstorm",
    "pyroclasticflow",
  ];
  
const SUPPORTS = {
  all: "all",
  orbit: [
    "condensation",
    "subvortexcondensation",
    "dustdevil",
    "landspoutlayer",
  ],
  orbitBlend: ["condensation", "dustdevil", "landspoutlayer"],
  alphaWindspeed: [
    "condensation",
    "subvortexcondensation",
    "mesocyclone",
    "hurricane",
    "dustdevil",
    "landspoutlayer",
    "curtains",
    "debris",
  ],
  physics: ["debris", "curtains"],
  reflect: ["stormcloud", "rainsheet", "rain", "snow"],
  reflectAll: ["stormcloud", "rainsheet", "rain", "snow", "cloud"],
  rain: ["rain", "snow"],
  flow: ["sandstorm", "pyroclasticflow"],
  condensation: ["condensation"],
  cloud: ["cloud"],
  debris: ["debris"],
};

const PROFILE_INTROS = {
  pack: "Top-level resource-pack settings, including the pack name, lighting controls, sky colors, sun colors, and fog setup.",
  condensation: "The condensation / funnel profile for tornadoes.",
  subvortexcondensation: "The condensation profile for subvortices.",
  mesocyclone:
    "The rotating storm-base cloud profile used above tornadoes.",
  hurricane:
    "The profile that hurricanes use for their rotating cloud structure.",
  dustdevil: "The inner dust tube profile for dust devils.",
  landspoutlayer: "The inner dust tube profile that landspouts use.",
  debris: "The debris profile for vortices.",
  curtains:
    "The profile for debris curtains that wrap around violent tornadoes.",
  stormcloud:
    "The storm cloud material used by weather entities like thunderstorms, rainstorms, tornadoes, etc,.",
  rainsheet:
    "The distant precipitation sheet profile that fills storms with broad rain or snow curtains.",
  rain: "The close-range rain particle profile that spawns around the player.",
  snow: "The close-range snow particle profile that spawns around the player.",
  cloud:
    "The ambient cloud profile for large drifting background cloud groups.",
  sandstorm: "The flow particle profile for sandstorms.",
  pyroclasticflow: "The flow particle profile for pyroclastic flows.",
};

const GROUPS = [
  {
    id: "pack",
    name: "pack",
    profiles: ["pack"],
    desc: "Basic resource-pack setup. Use this section to name the pack and define optional lighting and environment behavior.",
    ex: d(`
      pack_name = "My Storm Pack"

      lighting_and_environment = {
        legacy_lighting = false
      }
    `),
    fields: [
      field(
        "pack_name",
        "string",
        "The display name for this resource pack in pack selection.",
        ["packName"],
        d(`
          pack_name = "GStorms: Default Resource Pack"
        `),
      ),

      field(
        "lighting_and_environment",
        "table",
        "Optional world-lighting settings for this pack. This can change sky colors, sun colors, fog, particle lighting, and nighttime screen effects.",
        [],
        d(`
          lighting_and_environment = {
            legacy_lighting = false,

            controls = {
              exposure_strength = 5.5,
              night_darkness = 0.55
            },

            day = {
              sky_colors = {
                default = {top = Color(70, 146, 232), bottom = Color(206, 223, 227)},
                rain = {top = Color(174, 180, 175), bottom = Color(124, 130, 134)}
              },

              sun_colors = {
                default = Color(255, 248, 235),
                rain = Color(246, 255, 232)
              },

              fog = {
                default = {density = 0.75, fog_start = 1, fog_end = 45000},
                rain = {density = 0.75, fog_start = 1, fog_end = 45000},
                rain_clientside = {density = 0.85, fog_start = -1, fog_end = 7500}
              }
            }
          }
        `),
        ["pack"],
        [
          field(
            "legacy_lighting",
            "boolean",
            "Turns the older lighting behavior on or off. For particle lighting_and_environment controls, this needs to be set to false to use the new lighting engine and should only be used for legacy / older packs.",
            [],
            d(`
              legacy_lighting = false
            `),
          ),

          field(
            "controls",
            "table",
            "Global lighting tuning values. These control particle brightness, tinting, rain washout, and nighttime darkness.",
            [],
            d(`
              controls = {
                exposure_strength = 5.5,
                exposure_exponent = 0.35,
                contrast_strength = 0.1,
                tint_strength = 1.5,
                tint_control = 0.7,
                volumetric_strength = 0.1,
                night_darkness = 0.55,
                night_desaturate = 0.375
              }
            `),
            ["pack"],
            [
              field(
                "exposure_strength",
                "number",
                "Controls how strongly particles follow the scene brightness. Higher values make dim lighting darker, and lower values keep particles brighter during sunrise, sunset, nighttime, or heavy overcast.",
                [],
                d(`exposure_strength = 5.5`),
              ),
              field(
                "exposure_exponent",
                "number",
                "Controls the brightness curve. Lower values preserve more brightness through mid-light conditions, and higher values make the shift into darkness feel stronger.",
                [],
                d(`exposure_exponent = 0.35`),
              ),
              field(
                "contrast_strength",
                "number",
                "Controls how much separation exists between the bright and dark sides of shaded particles. Higher values look more dramatic, and lower values look softer and flatter.",
                [],
                d(`contrast_strength = 0.1`),
              ),
              field(
                "tint_strength",
                "number",
                "Controls how strongly sky and sun colors tint particles. Higher values make particles inherit more environmental color, and lower values keep their original colors more neutral.",
                [],
                d(`tint_strength = 1.5`),
              ),
              field(
                "tint_control",
                "number",
                "Controls how much saturated particle colors resist environmental tinting. Higher values protect strong base colors, and lower values let the environment recolor them more easily.",
                [],
                d(`tint_control = 0.7`),
              ),
              field(
                "volumetric_strength",
                "number",
                "Controls how washed out particles become in wet, foggy, or scattered lighting. Higher values make particles in rain and overcast scenes feel more diffused and softer.",
                [],
                d(`volumetric_strength = 0.1`),
              ),
              field(
                "night_darkness",
                "number",
                "Controls how much the screen darkens at night. Higher values make nights darker, and lower values keep nighttime visibility higher.",
                [],
                d(`night_darkness = 0.55`),
              ),
              field(
                "night_desaturate",
                "number",
                "Controls how much color is removed at night. Higher values make nighttime look more gray, and lower values keep night colors richer.",
                [],
                d(`night_desaturate = 0.375`),
              ),
            ],
          ),

          field(
            "sunrise / day / sunset / night",
            "table",
            "Time-of-day controls. Each phase allows for modifying sky colors, sun colors, and fog so the environment can smoothly change depending on the time of day.",
            [],
            d(`
              day = {
                sky_colors = {
                  default = {top = Color(70, 146, 232), bottom = Color(206, 223, 227)},
                  rain = {top = Color(174, 180, 175), bottom = Color(124, 130, 134)}
                },

                sun_colors = {
                  default = Color(255, 248, 235),
                  rain = Color(246, 255, 232)
                },

                fog = {
                  default = {density = 0.75, fog_start = 1, fog_end = 45000}
                }
              }
            `),
            ["pack"],
            [
              field(
                "sky_colors",
                "table",
                "Sky paint colors for normal weather and rainy or stormy weather.",
                [],
                d(`
                  sky_colors = {
                    default = {top = Color(70, 146, 232), bottom = Color(206, 223, 227)},
                    rain = {top = Color(174, 180, 175), bottom = Color(124, 130, 134)}
                  }
                `),
                ["pack"],
                [
                  field(
                    "default",
                    "table",
                    "The normal sky colors for this time-of-day phase.",
                    [],
                    d(
                      `default = {top = Color(70, 146, 232), bottom = Color(206, 223, 227)}`,
                    ),
                    ["pack"],
                    [
                      field(
                        "top",
                        "Color",
                        "The upper sky color.",
                        [],
                        d(`top = Color(70, 146, 232)`),
                      ),
                      field(
                        "bottom",
                        "Color",
                        "The lower horizon sky color.",
                        [],
                        d(`bottom = Color(206, 223, 227)`),
                      ),
                    ],
                  ),
                  field(
                    "rain",
                    "table",
                    "The sky colors blended in during rainy or stormy weather.",
                    [],
                    d(
                      `rain = {top = Color(174, 180, 175), bottom = Color(124, 130, 134)}`,
                    ),
                    ["pack"],
                    [
                      field(
                        "top",
                        "Color",
                        "The upper sky color during rain or storm conditions.",
                        [],
                        d(`top = Color(174, 180, 175)`),
                      ),
                      field(
                        "bottom",
                        "Color",
                        "The lower horizon sky color during rain or storm conditions.",
                        [],
                        d(`bottom = Color(124, 130, 134)`),
                      ),
                    ],
                  ),
                ],
              ),

              field(
                "sun_colors",
                "table",
                "Sunlight colors for normal weather and rainy or stormy weather. These help tint particle lighting and sky lighting.",
                [],
                d(`
                  sun_colors = {
                    default = Color(255, 248, 235),
                    rain = Color(246, 255, 232)
                  }
                `),
                ["pack"],
                [
                  field(
                    "default",
                    "Color",
                    "The default sun color at this time-of-day and phase.",
                    [],
                    d(`default = Color(255, 248, 235)`),
                  ),
                  field(
                    "rain",
                    "Color",
                    "The sun color used during rainy or stormy conditions.",
                    [],
                    d(`rain = Color(246, 255, 232)`),
                  ),
                ],
              ),

              field(
                "fog",
                "table",
                "Fog settings for normal weather, rain, and close-range clientside storm fog.",
                [],
                d(`
                  fog = {
                    default = {density = 0.75, fog_start = 1, fog_end = 45000},
                    rain = {density = 0.75, fog_start = 1, fog_end = 45000},
                    rain_clientside = {density = 0.85, fog_start = -1, fog_end = 7500}
                  }
                `),
                ["pack"],
                [
                  field(
                    "default",
                    "table",
                    "The default fog settings for this time-of-day and phase.",
                    [],
                    d(
                      `default = {density = 0.75, fog_start = 1, fog_end = 45000}`,
                    ),
                    ["pack"],
                    fogFields(),
                  ),
                  field(
                    "rain",
                    "table",
                    "The fog settings blended in during rainy or stormy weather.",
                    [],
                    d(
                      `rain = {density = 0.75, fog_start = 1, fog_end = 45000}`,
                    ),
                    ["pack"],
                    fogFields(),
                  ),
                  field(
                    "rain_clientside",
                    "table",
                    "Fog controls based on reflectivity or player experienced rain intensity, usually denser is better.",
                    [],
                    d(
                      `rain_clientside = {density = 0.85, fog_start = -1, fog_end = 7500}`,
                    ),
                    ["pack"],
                    fogFields(),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  },

  {
    id: "profile",
    name: "profile",
    profiles: SUPPORTS.all,
    desc: "Fields every particle profile entry can use, regardless of the profile type.",
    ex: d(`
      {
        key = "mesocyclone",
        material = "clouds_and_weather/wispy_smoke5",
        static_color = Color(255, 255, 255),
        height = 1200
      }
    `),
    fields: [
      field(
        "key",
        "string",
        "Which profile type this entry belongs to, such as condensation, debris, rain, snow, or cloud.",
        [],
        d(`key = "condensation"`),
      ),
      field(
        "material",
        "string",
        "The material path used by this particle.",
        [],
        d(`material = "clouds_and_weather/wispy_smoke4"`),
      ),
      field(
        "material_flags",
        "string",
        "Optional additional material flags passed into Material(), such as smooth filtering.",
        ["materialFlags"],
        d(`material_flags = "smooth"`),
      ),
      field(
        "static_color",
        "color/range",
        "Makes the profile use a flat static color. When this is set, it is used instead of shaded_color.",
        ["color"],
        d(`static_color = Color(255, 255, 255)`),
        "all",
        [
          field(
            "min",
            "Color",
            "Used if you want random colorations. This is random color #1.",
            [],
            d(`static_color = {min = Color(255, 255, 255), max = Color(255, 255, 255)}`),
          ),
          field(
            "max",
            "Color",
            "Used if you want random colorations. This is random color #2.",
            [],
            d(`static_color = {min = Color(255, 255, 255), max = Color(255, 255, 255)}`),
          ),
        ],
      ),
      field(
        "shaded_color",
        "table",
        "A bright and dark color pair used for 3D shading for sunlighting (bright) and backlighting (dark).",
        ["dynamic_color", "angle_colors", "angleColors"],
        d(`
        shaded_color = {bright = Color(255, 255, 255), dark = Color(75, 90, 110)}
      `),
        "all",
        [
          field(
            "bright",
            "Color/table",
            "The bright color used for sunlighting.",
            [],
            d(`bright = Color(255, 255, 255)`),
            "all",
            [
              field(
                "min",
                "Color",
                "Used if you want random colorations. This is random color #1.",
                [],
                d(`shaded_color = {bright = {min = Color(255, 255, 255), max = Color(255, 255, 255)}, dark = {min = Color(255, 255, 255), max = Color(255, 255, 255)}}`),
              ),
              field(
                "max",
                "Color",
                "Used if you want random colorations. This is random color #2.",
                [],
                d(`shaded_color = {bright = {min = Color(255, 255, 255), max = Color(255, 255, 255)}, dark = {min = Color(255, 255, 255), max = Color(255, 255, 255)}}`),
              ),
            ],
          ),
          field(
            "dark",
            "Color/table",
            "The dark color used for backlighting.",
            [],
            d(`dark = Color(75, 90, 110)`),
            "all",
            [
              field(
                "min",
                "Color",
                "Used if you want random colorations. This is random color #1.",
                [],
                d(`shaded_color = {bright = {min = Color(255, 255, 255), max = Color(255, 255, 255)}, dark = {min = Color(255, 255, 255), max = Color(255, 255, 255)}}`),
              ),
              field(
                "max",
                "Color",
                "Used if you want random colorations. This is random color #2.",
                [],
                d(`shaded_color = {bright = {min = Color(255, 255, 255), max = Color(255, 255, 255)}, dark = {min = Color(255, 255, 255), max = Color(255, 255, 255)}}`),
              ),
            ],
          ),
        ],
      ),
      field(
        "fall_speed",
        "number",
        "How fast the particle moves downward.",
        ["fallSpeed"],
        d(`fall_speed = 350`),
      ),
      field(
        "height",
        "number",
        "A height offset for the particle profile.",
        ["addHeight"],
        d(`height = 900`),
      ),
      field(
        "spawn_radius",
        "number",
        "The radius at which particles will spawn within, for rain and snow particles this is around the player, for other particles this is in the world around the entities position.",
        ["spawnRadius", "player_offset", "playerOffset"],
        d(`spawn_radius = 40000`),
        SUPPORTS.reflectAll,
      ),
      field(
        "centered",
        "boolean",
        "Centers particles around their point of orbit while still maintaining orbit related properties such as color and lifetime. Default resource pack dust devil tubes and landspout tubes use this flag.",
        [],
        d(`centered = true`),
        SUPPORTS.orbit,
      ),
      field(
        "blend_top",
        "boolean",
        "Fades particles near the top of the funnel or particle system so particles that normally connect to storm clouds blend slightly better.",
        ["blendTop"],
        d(`blend_top = true`),
        SUPPORTS.orbitBlend,
      ),
      field(
        "blend_angle",
        "boolean",
        "Orbit particles have particles behind the point of orbit faded to improve blending. If you're noticing back-lit shading peaking through the funnel, set this to true.",
        ["useAngleAlpha"],
        d(`blend_angle = true`),
        [
          "condensation",
          "subvortexcondensation",
          "mesocyclone",
          "hurricane",
          "dustdevil",
          "landspoutlayer",
        ],
      ),
      field(
        "lifetime_override",
        "boolean",
        "Forces the profile lifetime to be used when orbit particles normally control lifetime automatically.",
        ["useLifetimeOverride"],
        d(`lifetime_override = true`),
        [
          "condensation",
          "subvortexcondensation",
          "mesocyclone",
          "hurricane",
          "dustdevil",
          "landspoutlayer",
        ],
      ),
      field(
        "flow_particle_end_size_mult",
        "number",
        "Controls how much sandstorm or pyroclastic flow particles grow in size at the end of their life to create that billowing effect.",
        [],
        d(`flow_particle_end_size_mult = 3`),
        SUPPORTS.flow,
      ),
    ],
  },

  {
    id: "alpha_controls",
    name: "alpha_controls",
    profiles: SUPPORTS.all,
    aliases: ["alphaControls"],
    desc: "Controls the particle's base visibility and how it fades in or out over its lifetime.",
    ex: d(`
      alpha_controls = {
        alpha_min = 80,
        alpha_max = 140,
        fade_in = 0.05,
        fade_out = 0.85
      }
    `),
    fields: [
      field(
        "alpha_min",
        "number",
        "The lowest random opacity this particle can start with.",
        ["alphaMin"],
        d(`alpha_min = 80`),
      ),
      field(
        "alpha_max",
        "number",
        "The highest random opacity this particle can start with.",
        ["alphaMax"],
        d(`alpha_max = 140`),
      ),
      field(
        "fade_in",
        "number",
        "How far into the particle's lifetime the fade-in lasts, from 0 to 1. Higher values make particles appear more gradually. For example, 0.05 means the particle reaches full alpha after 5% of its lifetime.",
        ["fadeIn"],
        d(`fade_in = 0.05`),
      ),
      field(
        "fade_out",
        "number",
        "How much of the particle lifetime is spent fading out. Higher values make particles disappear more gradually near the end of their life. This is how far from the particles end of life from 0 to 1 as to how long it takes for a particle to completely fade out. If the fade in is 0.05 and the fade out is 0.95 then the particle starts fading out as soon as the particle completes its fade in.",
        ["fadeOut"],
        d(`fade_out = 0.95`),
      ),
    ],
  },

  {
    id: "rotation",
    name: "rotation",
    profiles: SUPPORTS.all,
    desc: "Picks a random starting rotation for the particle between min and max.",
    ex: d(`
      rotation = {
        min = -180,
        max = 180
      }
    `),
    fields: [
      field(
        "min",
        "number",
        "The minimum angle out of 360 degrees that the material itself can start rotated at upon initial spawn.",
        [],
        d(`min = -180`),
      ),
      field(
        "max",
        "number",
        "The maximum angle out of 360 degrees that the material itself can start rotated at upon initial spawn.",
        [],
        d(`max = 180`),
      ),
    ],
  },

  {
    id: "particle_parameters",
    name: "particle_parameters",
    profiles: SUPPORTS.all,
    aliases: ["particleParams"],
    desc: "Controls particle size, spawn amount, lifetime, size randomness, and optional maximum size.",
    ex: d(`
      particle_parameters = {
        size_multiplier = 2,
        size_random_multiplier = 1.5,
        count_multiplier = 0.75,
        lifetime = 9,
        max_size = 3000
      }
    `),
    fields: [
      field(
        "size_multiplier",
        "number",
        "The base size multiplier for this particle profile. Higher values make the particles larger.",
        ["pSizeMult"],
        d(`size_multiplier = 2`),
      ),
      field(
        "size_random_multiplier",
        "number",
        "How much random size variation is allowed. Higher values make particle sizes less uniform.",
        ["pSizeMultRand"],
        d(`size_random_multiplier = 1.5`),
      ),
      field(
        "count_multiplier",
        "number",
        "A multiplier for controlling the amount of particles for the profile, higher increases density and lower makes particles more sparse.",
        ["pCountMult"],
        d(`count_multiplier = 0.75`),
      ),
      field(
        "lifetime",
        "number",
        "How long each particle lasts in seconds. Some particle types can use 0 for automatic lifetime behavior or more specifically for particles that orbit, for particles that orbit except mesocyclones, using 0 is ideal as this allows for dynamic lifetime calculation.",
        [],
        d(`lifetime = 9`),
      ),
      field(
        "max_size",
        "number",
        "The largest allowed size for orbit-style particles like condensation layers.",
        ["particleMaxSize"],
        d(`max_size = 3000`),
        SUPPORTS.orbit,
      ),
    ],
  },

  {
    id: "offsets",
    name: "offsets",
    profiles: SUPPORTS.orbit,
    desc: "Adds offsets to particles around the central point of orbit.",
    ex: d(`
      offsets = {
        orbit_radius = 55,
        size = 100,
        orbit_radius_size_multiplier = 0.5
      }
    `),
    fields: [
      field(
        "orbit_radius",
        "number",
        "Adds an orbit radius offset for particles from the vortex center.",
        ["orbitRadius"],
        d(`orbit_radius = 55`),
      ),
      field(
        "size",
        "number",
        "Adds a sizing offset for particle sizes.",
        [],
        d(`size = 100`),
      ),
      field(
        "orbit_radius_size_multiplier",
        "number",
        "Since particle size scales with orbit radius, this determines how much particles increase in size as they move away from the vortex center, use 0.5 for uniform and seamless scaling.",
        ["orbitRadSizeMult"],
        d(`orbit_radius_size_multiplier = 0.5`),
      ),
    ],
  },

  {
    id: "spin",
    name: "spin",
    profiles: SUPPORTS.orbit,
    desc: "Adds material spin to particles.",
    ex: d(`
      spin = {
        spin_speed = 0.25,
        spin_direction = -1
      }
    `),
    fields: [
      field(
        "spin_speed",
        "number",
        "How fast the particle material rotates, similar to spin roll in the source particle editor",
        ["spinSpeed"],
        d(`spin_speed = 0.25`),
      ),
      field(
        "spin_direction",
        "number",
        "The spin direction that spin speed uses, can be + 1 or - 1.",
        ["spinDirection"],
        d(`spin_direction = -1`),
      ),
    ],
  },

  {
    id: "physics",
    name: "physics",
    profiles: SUPPORTS.physics,
    desc: "Controls how strongly physical particles are pushed by wind on each axis.",
    ex: d(`
      physics = {
        x = 14,
        y = 14,
        z = 9
      }
    `),
    fields: [
      field("x", "number", "X axis physics multiplier.", [], d(`x = 14`)),
      field("y", "number", "Y axis physics multiplier.", [], d(`y = 14`)),
      field("z", "number", "Z axis physics multiplier.", [], d(`z = 9`)),
    ],
  },

  {
    id: "alpha_windspeed",
    name: "alpha_windspeed",
    profiles: SUPPORTS.alphaWindspeed,
    aliases: ["alphaFromWindspeed"],
    desc: "Makes particles fade in or out depending on the entities windspeed.",
    ex: d(`
      alpha_windspeed = {
        windspeed_min = 65,
        windspeed_max = 200,
        alpha_min_multiplier = 0.4,
        alpha_max_multiplier = 1
      }
    `),
    fields: [
      field(
        "windspeed_min",
        "number",
        "The windspeed where the minimum alpha multiplier ends. Anything at or below this uses the alpha_min_multiplier.",
        ["wsMin"],
        d(`windspeed_min = 65`),
      ),
      field(
        "windspeed_max",
        "number",
        "The windspeed where the maximum alpha multiplier ends. Anything at or beyond this uses the alpha_max_multiplier.",
        ["wsMax"],
        d(`windspeed_max = 200`),
      ),
      field(
        "alpha_min_multiplier",
        "number",
        "The minimum alpha multiplier.",
        ["alphaMin"],
        d(`alpha_min_multiplier = 0.4`),
      ),
      field(
        "alpha_max_multiplier",
        "number",
        "The maximum alpha multiplier.",
        ["alphaMax"],
        d(`alpha_max_multiplier = 1`),
      ),
    ],
  },

  {
    id: "alpha_condensation",
    name: "alpha_condensation",
    profiles: SUPPORTS.condensation,
    aliases: ["alphaCondensation"],
    desc: "Controls extra condensation fading for tornado funnels based on windspeed, distance range, height, and curve strength.",
    ex: d(`
      alpha_condensation = {
        windspeed = {min = 80, max = 110},
        range = {min = 15, max = 35},
        height = {min = 0.5, max = 1},
        alpha_min_multiplier = 0,
        exponent = 1.5
      }
    `),
    fields: [
      field(
        "windspeed",
        "number/range",
        "The windspeed range at which windspeed based funnel fades can start for weaker tornadoes.",
        ["wind_speed", "windSpeed"],
        d(`windspeed = {min = 80, max = 110}`),
      ),
      field(
        "range",
        "number/range",
        "The range from the field windspeed at which funnels can end their fade.",
        [],
        d(`range = {min = 15, max = 35}`),
      ),
      field(
        "height",
        "number/range",
        "The height at which the base of the funnel gets smoothed and faded when within the starting windspeed and range, 1 for the top of the funnel and 0 for the base of the funnel.",
        [],
        d(`height = {min = 0.5, max = 1}`),
      ),
      field(
        "alpha_min_multiplier",
        "number",
        "The absolute minimum multiplier that the alpha_condensation alpha multiplier can modify alpha values by.",
        ["alphaMinMult"],
        d(`alpha_min_multiplier = 0`),
      ),
      field(
        "exponent",
        "number",
        "The curve strength for the fade. Higher values make the transition sharper, and lower values make it more gradual.",
        ["exp"],
        d(`exponent = 1.5`),
      ),
    ],
  },

  {
    id: "requirements",
    name: "requirements",
    profiles: SUPPORTS.alphaWindspeed,
    desc: "Optional filters that decide when the profile is allowed to be selected for the current vortex context if you want differing profiles for weaker vortices, wider vortices etc,.",
    ex: d(`
      requirements = {
        wind_speed = {min = 80, max = 180},
        rmw_size = {min = 100, max = 900}
      }
    `),
    fields: [
      field(
        "wind_speed",
        "number/range",
        "The entity windspeed range that allows the profile to be selected / become a candidate.",
        ["windSpeed", "windspeed"],
        d(`wind_speed = {min = 80, max = 180}`),
      ),
      field(
        "rmw_size",
        "number/range",
        "The radius-of-maximum-wind size range that allows the profile to be selected / become a candidate.",
        ["rmwSize", "rmw"],
        d(`rmw_size = {min = 100, max = 900}`),
      ),
    ],
  },

  {
    id: "cloud",
    name: "cloud",
    profiles: SUPPORTS.cloud,
    desc: "Controls the size and amount of ambient cloud groups.",
    ex: d(`
      cloud = {
        min_cloud_size = 4500,
        max_cloud_size = 11000,
        count_multiplier = 1
      }
    `),
    fields: [
      field(
        "min_cloud_size",
        "number",
        "The smallest size that a cloud can be.",
        ["minCloudSize"],
        d(`min_cloud_size = 4500`),
      ),
      field(
        "max_cloud_size",
        "number",
        "The largest size that a cloud can be.",
        ["maxCloudSize"],
        d(`max_cloud_size = 11000`),
      ),
      field(
        "count_multiplier",
        "number",
        "The multiplier for the number of cloud groups that spawn. Higher values make the ambient cloud field denser.",
        ["countMultiplier"],
        d(`count_multiplier = 1`),
      ),
    ],
  },

  {
    id: "reflectivity",
    name: "reflectivity",
    profiles: SUPPORTS.reflectAll,
    desc: "Uses storm intensity or radar reflectivity to decide when particles appear and how visible they are.",
    ex: d(`
      reflectivity = {
        min_reflectivity = 10,
        max_reflectivity = 100,
        reflectivity_alpha_multiplier = 1.5,
        no_alpha_reflectivity = false
      }
    `),
    fields: [
      field(
        "min_reflectivity",
        "number",
        "The reflectivity threshold (or precipitation threshold) at which particles start appearing / using the min reflectivity alpha multiplier.",
        ["minReflectivity"],
        d(`min_reflectivity = 10`),
        SUPPORTS.reflectAll,
      ),
      field(
        "max_reflectivity",
        "number",
        "The reflectivity threshold (or precipitation threshold) at which particles max out their alpha values.",
        ["maxReflectivity"],
        d(`max_reflectivity = 100`),
        SUPPORTS.reflectAll,
      ),
      field(
        "reflectivity_alpha_multiplier",
        "number",
        "An extra opacity multiplier applied to reflectivity-driven particles. Higher values make these particles more visible once reflectivity is within the configured range.",
        ["reflectivityAlphaMultiplier", "reflectivityAlphaMult"],
        d(`reflectivity_alpha_multiplier = 1.5`),
        SUPPORTS.reflectAll,
      ),
      field(
        "no_alpha_reflectivity",
        "boolean",
        "Stops reflectivity from changing particle opacity when true.",
        ["noAlphaReflectivity"],
        d(`no_alpha_reflectivity = true`),
        SUPPORTS.reflectAll,
      ),
    ],
  },

  {
    id: "color_over_water",
    name: "color_over_water",
    profiles: SUPPORTS.debris,
    aliases: ["colorOverWater"],
    desc: "Changes debris color or opacity while debris is over water.",
    ex: d(`
      color_over_water = {
        alpha_multiplier = 0.4,

        shaded_color = {bright = Color(245, 255, 255), dark = Color(75, 79, 83)}
      }
    `),
    fields: [
      field(
        "alpha_multiplier",
        "number",
        "The opacity multiplier used while debris is over water. Lower values make water debris more transparent.",
        ["alphaMult"],
        d(`alpha_multiplier = 0.4`),
      ),
      field(
        "static_color",
        "color/range",
        "A water-specific flat color used for debris over water.",
        ["color"],
        d(`static_color = Color(120, 130, 140)`),
        SUPPORTS.debris,
        [
          field(
            "min",
            "Color",
            "Used if you want random colorations. This is random color #1.",
            [],
            d(`static_color = {min = Color(255, 255, 255), max = Color(255, 255, 255)}`),
          ),
          field(
            "max",
            "Color",
            "Used if you want random colorations. This is random color #2.",
            [],
            d(`static_color = {min = Color(255, 255, 255), max = Color(255, 255, 255)}`),
          ),
        ],
      ),
      field(
        "shaded_color",
        "table",
        "A water-specific bright and dark shaded color pair for debris over water.",
        ["dynamic_color", "angle_colors", "angleColors"],
        d(`
        shaded_color = {bright = Color(245, 255, 255), dark = Color(75, 79, 83)}
      `),
        SUPPORTS.debris,
        [
          field(
            "bright",
            "Color/table",
            "The water-specific bright color used for sunlighting.",
            [],
            d(`bright = Color(245, 255, 255)`),
            SUPPORTS.debris,
            [
              field(
                "min",
                "Color",
                "Used if you want random colorations. This is random color #1.",
                [],
                d(`shaded_color = {bright = {min = Color(255, 255, 255), max = Color(255, 255, 255)}, dark = {min = Color(255, 255, 255), max = Color(255, 255, 255)}}`),
              ),
              field(
                "max",
                "Color",
                "Used if you want random colorations. This is random color #2.",
                [],
                d(`shaded_color = {bright = {min = Color(255, 255, 255), max = Color(255, 255, 255)}, dark = {min = Color(255, 255, 255), max = Color(255, 255, 255)}}`),
              ),
            ],
          ),
          field(
            "dark",
            "Color/table",
            "The water-specific dark color used for backlighting.",
            [],
            d(`dark = Color(75, 79, 83)`),
            SUPPORTS.debris,
            [
              field(
                "min",
                "Color",
                "Used if you want random colorations. This is random color #1.",
                [],
                d(`shaded_color = {bright = {min = Color(255, 255, 255), max = Color(255, 255, 255)}, dark = {min = Color(255, 255, 255), max = Color(255, 255, 255)}}`),
              ),
              field(
                "max",
                "Color",
                "Used if you want random colorations. This is random color #2.",
                [],
                d(`shaded_color = {bright = {min = Color(255, 255, 255), max = Color(255, 255, 255)}, dark = {min = Color(255, 255, 255), max = Color(255, 255, 255)}}`),
              ),
            ],
          ),
        ],
      ),
    ],
  },

  {
    id: "entity_overrides",
    name: "entity_overrides",
    profiles: SUPPORTS.all,
    aliases: ["entityOverrides"],
    desc: "Each override can contain most normal profile fields, such as alpha_controls, particle_parameters, alpha_windspeed, static_color, shaded_color etc,. Material overrides are not supported.",
    ex: d(`
      entity_overrides = {
        IsDestroying = {
          alpha_controls = {alpha_min = 120, alpha_max = 210},
          particle_parameters = {lifetime = 8}
        },

        Spout = {
          alpha_windspeed = {windspeed_min = 30, windspeed_max = 135},
          particle_parameters = {lifetime = 8}
        },

        DustDevil = {
          alpha_windspeed = {alpha_min_multiplier = 0.25}
        }
      }
    `),
    fields: [
      field(
        "IsDestroying",
        "table",
        "Applies while the entity is actively destroying things. The flag IsDestroying takes priority over all other flags so if the entity is a spout and is destroying things it will use these properties.",
        ["is_destroying", "isDestroying", "destroying"],
        d(`
        IsDestroying = {
          alpha_controls = {alpha_min = 120, alpha_max = 210},
          particle_parameters = {lifetime = 8}
        }
      `),
      ),
      field(
        "Tornado",
        "table",
        "Applies to tornado entities and lets the same profile use tornado specific behavior.",
        ["tornado"],
        d(`
        Tornado = {
          alpha_windspeed = {alpha_min_multiplier = 0.25}
        }
      `),
      ),
      field(
        "Spout",
        "table",
        "Applies to spout entities and lets the same profile use different behavior for waterspouts or similar spout-style vortices.",
        ["spout"],
        d(`
        Spout = {
          alpha_windspeed = {windspeed_min = 30, windspeed_max = 135},
          particle_parameters = {lifetime = 8}
        }
      `),
      ),
      field(
        "DustDevil",
        "table",
        "Applies to dust devil entities and lets the same profile use dust-devil-specific behavior.",
        ["dust_devil", "dustDevil"],
        d(`
        DustDevil = {
          alpha_windspeed = {alpha_min_multiplier = 0.25}
        }
      `),
      ),
      field(
        "Hurricane",
        "table",
        "Applies to hurricane entities and lets the same profile use hurricane specific behavior.",
        ["hurricane"],
        d(`
        Hurricane = {
          alpha_windspeed = {alpha_min_multiplier = 0.25}
        }
      `),
      ),
      field(
        "Derecho",
        "table",
        "Applies to derecho entities and lets the same profile use derecho specific behavior.",
        ["derecho"],
        d(`
        Derecho = {
          alpha_windspeed = {alpha_min_multiplier = 0.25}
        }
      `),
      ),
      field(
        "Thunderstorm",
        "table",
        "Applies to thunderstorm entities and lets the same profile use thunderstorm specific behavior.",
        ["thunderstorm"],
        d(`
        Thunderstorm = {
          alpha_windspeed = {alpha_min_multiplier = 0.25}
        }
      `),
      ),
      field(
        "Rainstorm",
        "table",
        "Applies to rainstorm entities and lets the same profile use rainstorm specific behavior.",
        ["rainstorm"],
        d(`
        Rainstorm = {
          alpha_windspeed = {alpha_min_multiplier = 0.25}
        }
      `),
      ),
    ],
  },
];