import {useTranslations} from 'next-intl';
 
export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className='text-left max-w-2xl'>
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p>{t('description')}</p>
      </div>
    </div>
  );
}