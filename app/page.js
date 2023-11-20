import Header from './components/Header';
import FileUpload from './components/FileUpload';
import FlashcardPreview from './components/FlashcardPreview';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="mb-auto">
          <FileUpload/>
          <FlashcardPreview />
        </main>
      <Footer />
      </div>
    </>
  );
}