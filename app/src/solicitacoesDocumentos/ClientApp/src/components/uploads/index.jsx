/* eslint-disable no-use-before-define */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFiles } from '../context/files.tsx';
import { DropContainer, UploadMessage } from './styles.ts';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Upload() {
  const { handleUpload } = useFiles();

  const onDrop = useCallback(
    (files) => {
      handleUpload(files);
    },
    [handleUpload],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/gif',
        'image/jfif',
        'image/jpg',
        '.pdf',
      ],
      onDrop,
    });

  const renderDragMessage = useCallback(() => {
    if (!isDragActive) {
      return <UploadMessage>Arraste documentos aqui...</UploadMessage>;
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error">
          Tipo de arquivo não suportado
        </UploadMessage>
      );
    }

    return <UploadMessage type="success">Solte as imagens aqui</UploadMessage>;
  }, [isDragActive, isDragReject]);

  return (
    <DropContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {renderDragMessage()}
    </DropContainer>
  );
}

export default Upload;
