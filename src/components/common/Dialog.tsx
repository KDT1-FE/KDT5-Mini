import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface IDialogModal {
  message: string;
}
export default function DialogModal({ message }: IDialogModal) {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    router.push('/');
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-999" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-bold mb-8 leading-6 text-primary flex justify-center">
                    SOONYANG
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-base text-gray-500 flex justify-center sm:mb-4">
                      {message}
                    </p>
                  </div>

                  <div className="mt-8 justify-center flex">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-primary bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:primary focus-visible:ring-offset-2"
                      onClick={closeModal}>
                      확인
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
