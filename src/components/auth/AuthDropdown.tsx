import { useSetRecoilState } from 'recoil';
import { IDropdown } from '@/types/ICommon';
import { signUpState } from '@/recoil/signUp';
import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function AuthDropdown({ ...props }: IDropdown) {
  const [selected, setSelected] = useState(Object.keys(props.options)[0]);
  const setSignUpInfo = useSetRecoilState(signUpState);

  // 계열사 dropdown 업데이트
  useEffect(() => {
    setSignUpInfo(prevInformation => ({
      ...prevInformation,
      ['department']: props.options[selected]
    }));
  }, [props.options, selected, setSignUpInfo]);

  return (
    <div className="pt-2 text-left border-b-2 h-10 border-gray-200 mb-4 max-w-[calc(100%-5rem)] sm:max-w-[calc(100%-7rem)]">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="pl-1 w-full cursor-default text-left sm:text-sm text-xs">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {Object.entries(props.options).map(([key, value]) => (
                <Listbox.Option
                  key={value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-primary text-white' : 'text-gray-900'
                    }`
                  }
                  value={key}>
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}>
                        {key}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
