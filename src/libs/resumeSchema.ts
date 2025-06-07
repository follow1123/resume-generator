import { z } from "zod/v4";

export const BasicInfoSchema = z.object({
  name: z.string(),
  age: z.number().gt(17, "年龄必须大于 18 岁").lt(100, "年龄必须小于 100 岁"),
  gender: z.string(),
  phone: z.string().optional(),
  workingYears: z
    .number("工作年限必须为数字")
    .gt(0, "工作年限错误")
    .lt(100, "工作年限错误")
    .optional(),
  mailbox: z.email("邮箱格式错误").optional(),
});

export const SkillSchema = z.string();
export const SkillsSchema = z.array(SkillSchema);

export const TechStackSchema = z.string();
export const TechStacksSchema = z.array(TechStackSchema).optional();

export const ResponsibilitySchema = z.string();
export const ResponsibilitiesSchema = z.array(ResponsibilitySchema);

export const OtherDescriptionSchema = z.string();
export const OtherDescriptionsSchema = z
  .array(OtherDescriptionSchema)
  .optional();

export const ProjectSchema = z.object({
  name: z.string(),
  desc: z.string(),
  techStacks: TechStacksSchema,
  responsibilities: ResponsibilitiesSchema,
  otherDescriptions: OtherDescriptionsSchema,
});

export const ProjectsSchema = z.array(ProjectSchema);

export const DurationSchema = z.object({
  joiningDate: z.string(),
  leavingDate: z.string().optional(),
});

export const EntitySchema = DurationSchema.extend({
  name: z.string(),
  projects: ProjectsSchema,
});

export const ExperiencesSchema = z.array(EntitySchema);

export const AdditionalSchema = z.string();

export const AdditionalItemsSchema = z.array(AdditionalSchema);

export const ResumeSchema = z.object({
  name: z.string(),
  basic: BasicInfoSchema,
  skills: SkillsSchema,
  experiences: ExperiencesSchema,
  additionalItems: AdditionalItemsSchema,
});

export type ResumeType = z.infer<typeof ResumeSchema>;

export type BasicInfoType = z.infer<typeof BasicInfoSchema>;

export type SkillType = z.infer<typeof SkillSchema>;
export type SkillsType = z.infer<typeof SkillsSchema>;

export type TechStackType = z.infer<typeof TechStackSchema>;
export type TechStacksType = z.infer<typeof TechStacksSchema>;

export type ResponsibilityType = z.infer<typeof ResponsibilitySchema>;
export type ResponsibilitiesType = z.infer<typeof ResponsibilitiesSchema>;

export type ProjectType = z.infer<typeof ProjectSchema>;
export type ProjectsType = z.infer<typeof ProjectsSchema>;

export type DurationType = z.infer<typeof DurationSchema>;
export type EntityType = z.infer<typeof EntitySchema>;

export type OtherDescriptionType = z.infer<typeof OtherDescriptionSchema>;
export type OtherDescriptionsType = z.infer<typeof OtherDescriptionsSchema>;

export type ExperiencesType = z.infer<typeof ExperiencesSchema>;

export type AdditionalType = z.infer<typeof AdditionalSchema>;
export type AdditionalItemsType = z.infer<typeof AdditionalItemsSchema>;
