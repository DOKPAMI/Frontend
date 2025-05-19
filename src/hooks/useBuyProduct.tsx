import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { useToast } from './useToast';

export function useBuyProduct() {
  const packageId = '0x0f19d50ac07d766a43b84363fe3f1fd7598bbfa70dce84fbe73dc093122e0303';
  const { setToastState } = useToast();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const account = useCurrentAccount();

  const buyEventProduct = ({ storeId, slotNumber }: { storeId: string; slotNumber: number }) => {
    const collectionId = '0x895d1679f335d5e50dde29d604ca55362d03e98c68bdcad212060b14d196398a';

    setToastState({
      type: 'loading',
      message: 'Request is being created...',
    });

    const tx = new Transaction();
    const [request] = tx.moveCall({
      package: packageId,
      module: 'collection',
      function: 'new_request',
      arguments: [tx.object(collectionId), tx.object(storeId), tx.pure.u64(0)],
    });
    const [base] = tx.moveCall({
      package: packageId,
      module: 'collection',
      function: 'confirm_request',
      typeArguments: [`${packageId}::collection::Base`],
      arguments: [tx.object(collectionId), tx.object(storeId), tx.object(request)],
    });

    for (let i = 1; i < slotNumber + 1; i++) {
      const [request] = tx.moveCall({
        package: packageId,
        module: 'collection',
        function: 'new_request',
        arguments: [tx.object(collectionId), tx.object(storeId), tx.pure.u64(i)],
      });

      const [product] = tx.moveCall({
        package: packageId,
        module: 'collection',
        function: 'confirm_request',
        typeArguments: [`${packageId}::collection::Item`],
        arguments: [tx.object(collectionId), tx.object(storeId), tx.object(request)],
      });

      tx.moveCall({
        package: packageId,
        module: 'collection',
        function: 'equip_item_to_base',
        arguments: [tx.object(collectionId), tx.object(base), tx.object(product)],
      });
    }

    tx.transferObjects([tx.object(base)], tx.pure.address(account?.address as string));

    signAndExecuteTransaction(
      {
        transaction: tx.serialize(),
      },
      {
        onSuccess: (data) => {
          console.log('Success! data:', data);
          setToastState({
            type: 'success',
            message: 'Buying product succeeded.',
          });
        },
        onError: (err) => {
          console.log('Error', err);
          setToastState({
            type: 'error',
            message: 'Something went wrong while buying the product. Please try again.',
          });
        },
      },
    );
  };
  return {
    buyEventProduct,
  };
}
