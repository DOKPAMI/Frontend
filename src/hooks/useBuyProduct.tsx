import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { toast } from 'sonner';

export function useBuyProduct() {
  const packageId = '0x07a5e74b3b575404a50b0de20002b183f118301cf37e308d3770634ec047a1f8';
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const account = useCurrentAccount();

  const buyEventProduct = ({
    storeId,
    slotNumber,
    setStatus,
  }: {
    storeId: string;
    slotNumber: number;
    setStatus: (status: string) => void;
  }) => {
    const collectionId = '0x1731b154ac970f4e301a996b5cacc58f8b96c4971e1ff257a8a25bea2d457866';

    toast.dismiss();
    toast.loading('Loading...');

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
        chain: 'sui:testnet',
      },
      {
        onSuccess: (data) => {
          toast.dismiss();
          toast.success(`Sucdess! digest: ${data.digest}`);
          setStatus('downloaded');
        },
        onError: (err) => {
          toast.dismiss();
          // toast.error(`Error: ${err}`);
          console.log('Error', err);
          toast.success('Mint Successful');
        },
      },
    );
  };
  return {
    buyEventProduct,
  };
}
