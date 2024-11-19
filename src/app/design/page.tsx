import CustomButton from "@/components/common/Button";
import CustomTextButton from "@/components/common/TextButton";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p className="h1">Heading 1</p>
        <p className="h2">Heading 2</p>
        <p className="h3">Heading 3</p>
        <p className="subtitle1">Subtitle 1</p>
        <p className="subtitle2">Subtitle 2</p>
        <p className="subtitle3">Subtitle 3</p>
        <p className="body1-semibold">Body 1 SemiBold</p>
        <p className="body1-md">Body 1 Medium</p>
        <p className="body2-semibold">Body 2 SemiBold</p>
        <p className="body2-md">Body 2 Medium</p>
        <p className="body2-regular">Body 2 Regular</p>
        <p className="p">paragraph</p>
        <p className="small">small paragraph</p>
        <div className="m-8">
          <p className="h2">Color</p>
          <p className="subtitle2">Background/Foreground</p>
          <div className="w-full h-8 bg-background"></div>
          <div className="w-full h-8 bg-foreground"></div>
          <p className="subtitle2">Neutral Color</p>
          <div className="w-full h-8 bg-neutral-white"></div>
          <div className="w-full h-8 bg-neutral-100"></div>
          <div className="w-full h-8 bg-neutral-200"></div>
          <div className="w-full h-8 bg-neutral-300"></div>
          <div className="w-full h-8 bg-neutral-400"></div>
          <div className="w-full h-8 bg-neutral-500"></div>
          <div className="w-full h-8 bg-neutral-600"></div>
          <div className="w-full h-8 bg-neutral-700"></div>
          <div className="w-full h-8 bg-neutral-800"></div>
          <div className="w-full h-8 bg-neutral-900"></div>
          <div className="w-full h-8 bg-neutral-black"></div>
          <p className="subtitle2">Primary Color</p>
          <div className="w-full h-8 bg-primary-100"></div>
          <div className="w-full h-8 bg-primary-200"></div>
          <div className="w-full h-8 bg-primary-300"></div>
          <div className="w-full h-8 bg-primary-400"></div>
          <div className="w-full h-8 bg-primary-500"></div>
          <div className="w-full h-8 bg-primary-600"></div>
          <div className="w-full h-8 bg-primary-700"></div>
          <div className="w-full h-8 bg-primary-800"></div>
          <div className="w-full h-8 bg-primary-900"></div>
          <p className="subtitle2">Secondary Color</p>
          <div className="w-full h-8 bg-secondary-100"></div>
          <div className="w-full h-8 bg-secondary-200"></div>
          <div className="w-full h-8 bg-secondary-300"></div>
          <div className="w-full h-8 bg-secondary-400"></div>
          <div className="w-full h-8 bg-secondary-500"></div>
          <div className="w-full h-8 bg-secondary-600"></div>
          <div className="w-full h-8 bg-secondary-700"></div>
          <div className="w-full h-8 bg-secondary-800"></div>
          <div className="w-full h-8 bg-secondary-900"></div>
          <p className="subtitle2">Tertiary Color</p>
          <div className="w-full h-8 bg-tertiary-100"></div>
          <div className="w-full h-8 bg-tertiary-200"></div>
          <div className="w-full h-8 bg-tertiary-300"></div>
          <div className="w-full h-8 bg-tertiary-400"></div>
          <div className="w-full h-8 bg-tertiary-500"></div>
          <div className="w-full h-8 bg-tertiary-600"></div>
          <div className="w-full h-8 bg-tertiary-700"></div>
          <div className="w-full h-8 bg-tertiary-800"></div>
          <div className="w-full h-8 bg-tertiary-900"></div>
          <div className="w-full h-8 bg-tertiary-900"></div>
        </div>

        <p className="h2">Button</p>
        <div>
          <CustomButton size="sm">Default</CustomButton>
          <CustomButton size="sm" color="secondary">
            Default
          </CustomButton>
          <CustomButton size="sm" disabled>
            Default
          </CustomButton>
          <CustomButton size="sm" color="secondary" disabled>
            Default
          </CustomButton>
        </div>

        <div>
          <CustomButton size="md">Default</CustomButton>
          <CustomButton size="md" color="secondary">
            Default
          </CustomButton>
          <CustomButton size="md" disabled>
            Default
          </CustomButton>
          <CustomButton size="md" color="secondary" disabled>
            Default
          </CustomButton>
        </div>
        <div>
          <CustomButton size="lg">Default</CustomButton>
          <CustomButton size="lg" color="secondary">
            Default
          </CustomButton>
          <CustomButton size="lg" disabled>
            Default
          </CustomButton>
          <CustomButton size="lg" color="secondary" disabled>
            Default
          </CustomButton>
        </div>
        <p className="h2">Text Button</p>
        <div>
          <CustomTextButton size="sm">Default</CustomTextButton>
          <CustomTextButton size="sm" disabled>
            Default
          </CustomTextButton>
        </div>
        <div>
          <CustomTextButton size="md">Default</CustomTextButton>
          <CustomTextButton size="md" disabled>
            Default
          </CustomTextButton>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
