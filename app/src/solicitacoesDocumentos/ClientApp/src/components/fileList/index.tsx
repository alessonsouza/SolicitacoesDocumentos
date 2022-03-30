/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-use-before-define
import { useContext } from 'react';
import { MdCheckCircle, MdError } from 'react-icons/md';

import { Container, FileInfo, Preview } from './styles';
// eslint-disable-next-line import/no-unresolved
import { useFiles, IFile } from '../context/files';
// // import { IFile } from "../context/files.tsx";
import { UploadContext } from '../../lib/context/upload-context';
import { LoaderContext } from '../../lib/context/loader-context';
import APISolicitacoes from '../../lib/api/solicitacoes';
// import Ale from '../../assets/uploads/'
import endpoint from '../../endpoints.config';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {
  Fab,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDownloadCircle  } from '@mdi/js';

function FileList(props: any) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  let { uploadedFiles: files, deleteFile } = useFiles();
  const { setDadosUpload } = useContext(UploadContext);
  const { setIsLoading } = useContext(LoaderContext);

  if (files?.length > 0) {
    files?.forEach((element) => {
      if (!element.origem) {
        delete element.id;
        element.path = `/wwwroot/Docs/${element.fileName}`;
        element.created_at = dayjs
          .utc()
          .tz('America/Sao_Paulo')
          .local()
          .format();
        element.origem = props.type;
      }
    });
    setDadosUpload(files);
  }

  if ((props.type === 'S' || props.type === 'U') && props.docs.length > 0) {
    if (files?.length > 0) {
      props.docs.forEach((element: IFile) => {
        if (!files.find((el) => el.id === element.id)) {
          files.push(element);
        }
      });
      setDadosUpload(files);
    }

    if (files?.length === 0 && props.docs.length > 0) {
      files = props.docs;
    }
    // if (files?.length > 0) {
    //   setDadosUpload(files);
    // }
  }

  const Downloading = async (fileName: string) => {
    setIsLoading(true);  
    const resposta:any = await APISolicitacoes.getImage({fileName: fileName});

    const blob = new Blob([resposta], {
      type: 'application/octet-stream',
    });

    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    console.log(link);
    link.click();
    window.URL.revokeObjectURL(url);
    setIsLoading(false);
  }

  // if (!files?.length) {
  //   return (
  //     <span>
  //       <MdMoodBad
  //         style={{ marginLeft: '45%', marginTop: 10 }}
  //         size={24}
  //         color="#d5d2d2"
  //       />
  //     </span>
  //   )
  // }
  return (
    <Container>
      {files.map(
        (uploadedFile: IFile) => (
          // uploadedFile.fileName === dadosUpload && (
          <li key={uploadedFile.fileName}>
            <FileInfo>
              <Preview
                src={`${endpoint.UserBaseUrl}/wwwroot/Docs/${uploadedFile.fileName}`}
              />
              <div>
                <strong>{uploadedFile.fileName}</strong>
                <span>
                  {uploadedFile.size}
                  {/* {!!uploadedFile.url && ( */}
                  {/* eslint-disable-next-line react/button-has-type */}
                  <button onClick={() => deleteFile(uploadedFile.fileName)}>
                    Excluir
                  </button>
                  {/* )} */}
                </span>
              </div>
            </FileInfo>
            {/* <li>
                <FileInfo>
                  <Preview
                    src={`${endpoint.UserBaseUrl}/events/image/${uploadedFile.fileName}`}
                  />
                  <strong>{uploadedFile.fileName}</strong>
                </FileInfo>
              </li> */}
            <div>
              {/* {!uploadedFile.uploaded && !uploadedFile.error && (
                <CircularProgressbar
                  styles={{
                    root: { width: 24 },
                    path: { stroke: '#7159c1' },
                  }}
                  strokeWidth={10}
                  text={String(uploadedFile.progress)}
                  value={uploadedFile.progress || 0}
                />
              )} */}

              {uploadedFile.id && (
                // <a
                //   href={`${endpoint.UserBaseUrl}/${uploadedFile.path}/${uploadedFile.fileName}`}
                //   target="_blank"
                //   rel="noopener noreferrer">
                //   <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                //   {/*  eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                //   {/* <img src="C:\www\AgendaEventos\assets\uploads\pp.jpg"
                // className="img" alt="My image" /> */}
                // </a>
                <Fab
                className="ml-25 mt-2 fa fa-download"
                style={{ backgroundColor: '#79787d', fontSize: "26px", cursor: 'pointer',margin: '2%', color: '#000000'}}
                onClick={() =>  {Downloading(uploadedFile.fileName)}}>
                <Icon
                  path={mdiDownloadCircle}
                  title="Baixar"
                  size={1}
                  color="white"
                />
              </Fab>
              )}

              {uploadedFile.uploaded && (
                <MdCheckCircle size={24} color="#78e5d5" />
              )}
              {uploadedFile.error && <MdError size={24} color="#e57878" />}
            </div>
          </li>
        ),
        // ),
      )}

      {/* {dadosUpload && !files?.length && (
        <li>
          <FileInfo>
            <Preview
              src={`${endpoint.UserBaseUrl}/events/image/${dadosUpload}`}
            />
            <strong>{dadosUpload}</strong>
          </FileInfo>
        </li>
      )} */}
    </Container>
  );
}

export default FileList;
