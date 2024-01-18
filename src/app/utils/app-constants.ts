export interface DistributorListElement {
    Srno:number;
    DistributorName:string;
    DistributorCode: number;
    City: string;
    Email: string;
    PhoneNo: number; 
    status: string
  }
  
export const LOCALSTORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    TOKEN_OBJECT: 'token_object',
    REFRESH_TOKEN: 'refresh_token',
    ACTIVE_USER_DETAILS: 'ActiveUserDetails',
    USER_TYPE: 'userType',
    COMPANY_ID:'companyId',
    COMPANY_SPECIFIC_COMPONENTS:'companySpecificComponents',
    THEME_COLOR:'currentTheme'
  };

export const LOCALSTORAGE_VALUES = {
  ADMIN: 'ROLE_ADMIN',
  DISTRIBUTOR: 'ROLE_DISTRIBUTOR',
  DISTRIBUTOR_USER: 'ROLE_DISTRIBUTOR_USER'
}

export const LOGOCODE={
  SMARTTRACKER:' <svg width="348.1727630897413" height="353.8828125" viewBox="0 0 343.75 349.3875158911282" class="css-1j8o68f"><defs id="SvgjsDefs31975"><linearGradient id="SvgjsLinearGradient31984"><stop id="SvgjsStop31985" stop-color="#7d141d" offset="0"></stop><stop id="SvgjsStop31986" stop-color="#ff1e27" offset="1"></stop></linearGradient><linearGradient id="SvgjsLinearGradient31987"><stop id="SvgjsStop31988" stop-color="#7d141d" offset="0"></stop><stop id="SvgjsStop31989" stop-color="#ff1e27" offset="1"></stop></linearGradient><linearGradient id="SvgjsLinearGradient31990"><stop id="SvgjsStop31991" stop-color="#7d141d" offset="0"></stop><stop id="SvgjsStop31992" stop-color="#ff1e27" offset="1"></stop></linearGradient><linearGradient id="SvgjsLinearGradient31993"><stop id="SvgjsStop31994" stop-color="#7d141d" offset="0"></stop><stop id="SvgjsStop31995" stop-color="#ff1e27" offset="1"></stop></linearGradient></defs><g id="SvgjsG31976" featurekey="rootContainer" transform="matrix(1.8478370799580792,0,0,1.8478370799580792,0.0006458590410276757,0.0003187442129491974)" fill="url(#SvgjsLinearGradient31984)"><path xmlns="http://www.w3.org/2000/svg" d="M17.914 148.907zM22.657 154.94a90.586 90.586 0 0 0 5.861 6.251c6.914 6.805 15.159 12.525 24.004 16.851 3.259 1.526 6.265 3.107 9.787 4.468.88.338 1.779.7 2.724 1.026.953.302 1.941.604 2.974.903 1.027.321 2.122.549 3.267.786 1.146.23 2.336.493 3.614.624a91.24 91.24 0 0 1-18.434-5.99 93.833 93.833 0 0 1-16.873-9.842c-10.548-7.727-19.57-17.648-26.16-28.989-.272-.339-.685-.985-1.18-1.808l-.796-1.348-.803-1.551c-.534-1.076-1.149-2.168-1.62-3.226a71.281 71.281 0 0 0-1.326-2.748c2.048 5.101 4.412 9.563 7.059 13.806a93.473 93.473 0 0 0 3.869 5.697c-.192-.259-.392-.511-.583-.771a95.012 95.012 0 0 0 4.6 5.841l.016.02zM18.039 149.078l-.125-.17.125.17zM1.335 106.042l-.483-3.875c.256 2.365.553 5.008 1.096 7.654l-.327-1.879a23.961 23.961 0 0 1-.286-1.9zM85.812 185.575c6.652.673 13.628.472 20.461-.609 6.837-1.077 13.524-2.987 19.741-5.449-11.45 4.503-23.602 6.506-35.49 6.171-1.591-.025-3.159 0-4.712-.113z"></path><path xmlns="http://www.w3.org/2000/svg" d="M46.426 171.967l-.259-.165c.087.055.172.111.259.165zM46.167 171.802zM43.653 170.135zM56.077 177.284A83.837 83.837 0 0 0 73.2 183.1c-9.688-2.21-18.805-6.109-26.774-11.133 3.06 1.947 6.277 3.749 9.651 5.317zM177.002 107.094c.098-1.58.296-3.238.346-4.027.594-5.071.77-9.401.745-13.745-.11-.783-.425-2.25-.55-3.918-.153-1.672-.378-3.309-.568-4.924-.289-1.601-.538-3.186-.854-4.74 2.275 11.617 2.237 23.279.144 34.282a94.97 94.97 0 0 1 .737-2.928z"></path><path xmlns="http://www.w3.org/2000/svg" d="M.887 83.482c.848-6.9 2.653-13.626 4.37-18.107l-.695 3.28c.429-.961 1.122-3.194 2.067-5.557l.682-1.802.753-1.747c.5-1.131.92-2.203 1.363-3.025-.303.771-.595 1.602-.947 2.436-.345.837-.732 1.687-1.101 2.542l1.514-3.409A111.863 111.863 0 0 0 4.954 69.8c-1.133 4.352-2.029 8.926-2.511 13.032-.14 1.024-.189 2.024-.28 2.978-.067.954-.183 1.864-.192 2.724-.042 1.719-.1 3.224-.071 4.428.105 2.409.25 3.61.459 2.939.411-1.333.403-8.188 1.837-16.767.767-4.276 1.868-8.966 3.362-13.561 1.483-4.599 3.427-9.058 5.44-12.992l-.592 1.292-.545 1.331-1.116 2.691-1.024 2.78-.521 1.402c-.153.476-.308.954-.461 1.434-1.32 3.807-2.307 7.816-3.167 11.857l-.559 3.052c-.205 1.014-.292 2.046-.444 3.067-.318 2.041-.434 4.097-.611 6.129-.199 4.074-.239 8.098.13 11.946-.015-.914-.03-1.726-.017-2.512l.115-2.355c.048-.809.039-1.667.115-2.65.07-.983.134-2.091.19-3.402.391-6.608 1.572-13.15 3.408-19.481 1.75-6.358 3.814-11.957 6.889-17.03l.801-1.526c.542-1.024.993-2.034 1.566-3.064.653-1.13 1.278-1.976 1.784-2.751.521-.767.963-1.441 1.469-2.095l3.682-5.082c.075-.009-.022.185-.2.473a28.962 28.962 0 0 1 1.959-2.49c.755-.875 1.488-1.803 2.109-2.569.146-.007.288-.011.623-.251 8.65-9.197 19.295-16.692 31.291-21.417l2.667-1.039 2.7-.899 1.343-.448 1.36-.38 2.71-.753c1.55-.373 3.12-.751 4.721-1.091l2.437-.426c.819-.141 1.642-.3 2.484-.378 1.674-.201 3.134-.625 3.921-.729 4.369-.249 8.73-.199 13.849.216.397.007 1.015.043 1.732.082.717.041 1.537.061 2.332.134.932.21 1.927.418 2.971.621 6.369.988 12.527 2.754 18.386 5.103l-.007-.028 2.244.894 2.29 1.058c1.571.684 3.11 1.559 4.7 2.383.798.407 1.554.904 2.338 1.354.77.474 1.576.894 2.32 1.412 1.508 1.002 3.037 1.961 4.446 3.032a99.912 99.912 0 0 1 6.6 5.198c.046.042.094.081.14.122l.042.038 1.457 1.322 1.394 1.391 1.395 1.392c.462.467.89.967 1.337 1.449-.216-.35-.208-.491-.2-.63-.689-.66-1.504-1.441-2.309-2.21 1.343 1.222 2.515 2.327 3.477 3.229.371.474.776.94 1.16 1.449l1.186 1.566 1.261 1.629 1.255 1.752c2.226 2.838 4.191 5.874 6.057 8.97.864 1.588 1.817 3.131 2.586 4.774l1.213 2.436 1.092 2.497c.314.533.192.022.231-.068 1.225 2.962 2.21 6.042 3.102 9.146a88.212 88.212 0 0 1 3.408 17.211c.225 1.378.321 2.772.52 4.153l-.123 2.924c-.001 1.103.057 2.206.01 3.311l-.128 3.326c-.016.75-.124 1.569-.187 2.459-.084.888-.128 1.846-.256 2.856l-.412 3.192c-.132 1.119-.387 2.269-.583 3.471a90.635 90.635 0 0 1-4.312 15.482c-.242.826-.427 1.486-.592 1.855-.627 1.501-1.296 2.954-1.942 4.385-.723 1.394-1.386 2.788-2.127 4.108a86.09 86.09 0 0 1-7.949 12.379c-.336.439-.649.885-.987 1.297l-.998 1.206c-.66.779-1.25 1.558-1.876 2.234-1.251 1.352-2.301 2.606-3.286 3.549-1.128 1.178-1.027 1.233-.246.665a35.07 35.07 0 0 0 1.608-1.262l2.122-1.914c.776-.677 1.519-1.441 2.235-2.161.708-.725 1.416-1.386 1.962-1.984 1.101-1.191 1.824-1.926 1.67-1.599-1.777 3.345-5.013 7.471-9.743 12.035-2.413 2.227-5.128 4.647-8.339 6.98-1.566 1.221-3.307 2.338-5.082 3.558-1.834 1.123-3.708 2.353-5.757 3.445-4.484 2.442 3.365-1.475 3.577-1.512a22.87 22.87 0 0 1-2.377 1.64c-1.478.786-2.943 1.597-4.474 2.273-.895.411-1.774.855-2.679 1.239l-2.729 1.122 1.444-.568c2.952-1.173 5.711-2.555 8.202-3.922-.936.566-1.96 1.221-3.082 1.812-1.203.622-2.448 1.302-3.697 1.909l-3.625 1.686c12.968-4.711 24.885-12.507 34.319-22.67 4.723-5.066 8.935-10.631 12.369-16.651a93.904 93.904 0 0 0 8.288-18.999c-3.154 9.93-8.071 19.052-13.981 26.765 10.744-14.507 17.15-32.293 17.999-50.636-.001 1.011-.101 2.018-.168 3.025-.083 1.007-.123 2.018-.241 3.022-.257 2.005-.441 4.021-.827 6.009-.624 4-1.636 7.931-2.782 11.815 2.262-7.021 3.613-14.424 4.145-21.869.554-7.451.092-14.947-1.057-22.211 1.974 9.622 2.301 20.524.619 31.298 1.182-6.949 1.482-14.112 1.028-21.214-.102-2.713-.422-5.407-.685-7.901-.377-2.476-.662-4.762-1.027-6.611 1.445 6.826 2.015 12.648 2.293 18.136-.267-11.977-2.748-24.112-7.62-35.511 2.659 6.191 4.842 12.851 6.175 19.698 1.34 6.84 1.897 13.838 1.58 20.57-.015-.788.018-1.575-.028-2.366l-.107-2.391c.287 10.85-1.384 21.604-4.696 31.717-1.662 5.056-3.715 9.969-6.2 14.644a95.521 95.521 0 0 1-8.56 13.316c3.673-4.29 7.551-10.354 10.646-17.015 3.081-6.675 5.368-13.894 6.941-20.199-2.314 11.322-6.907 22.494-13.571 32.471-6.646 9.985-15.351 18.764-25.423 25.502-10.06 6.759-21.474 11.437-33.187 13.748a94.608 94.608 0 0 1-17.657 1.809 94.462 94.462 0 0 1-17.361-1.515l3.005.571c1.002.19 2.018.295 3.026.445 2.016.324 4.055.446 6.087.633 4.073.229 8.168.306 12.25-.005 4.089-.217 8.152-.827 12.196-1.572 2.006-.456 4.036-.829 6.017-1.414.994-.278 2-.521 2.987-.83l2.955-.958c-1.492.462-3.062 1.074-4.739 1.523l-2.101.618a91.772 91.772 0 0 0 12.91-4.496 89.46 89.46 0 0 0 5.651-2.705 96.653 96.653 0 0 1-10.714 4.872 98.407 98.407 0 0 1-21.66 5.382c-1.11.176-2.122.231-3.029.326l-2.428.24c-1.429.113-2.484.164-3.222.245-1.477.147-1.687.284-1.099.397.587.113 1.971.203 3.673.251 1.697-.01 3.71-.101 5.541-.268 18.397-1.887 35.288-9.107 48.824-19.916 13.545-10.811 23.919-25.172 29.701-41.467.363-.946.642-1.922.944-2.89.293-.971.617-1.932.882-2.912.491-1.97 1.072-3.917 1.448-5.917l.619-2.985.487-3.012.241-1.507.172-1.517.342-3.034c.698-8.114.422-16.315-.812-24.363-.66-4.554-1.82-9.961-3.315-14.777l-1.15-3.484c-.4-1.107-.825-2.151-1.203-3.133l-.557-1.415-.571-1.271-.981-2.124c-3.134-6.359-7.072-12.424-11.682-18.065-4.605-5.643-9.896-10.868-15.861-15.418l-2.244-1.703-2.327-1.608-1.166-.806-1.203-.756-2.417-1.508c-3.295-1.904-6.67-3.739-10.228-5.261-3.521-1.598-7.206-2.895-10.957-4.055-1.895-.52-3.781-1.1-5.724-1.499-.968-.209-1.928-.463-2.907-.638l-2.944-.521C100.363.01 93.04-.285 85.724.265 78.412.83 71.069 2.218 64.028 4.614l-2.635.913c-.881.297-1.73.682-2.597 1.019-.858.359-1.735.673-2.577 1.069l-2.532 1.173c-.852.376-1.675.808-2.496 1.245l-2.469 1.297-2.402 1.412c-.8.472-1.606.933-2.372 1.458l-2.324 1.528c-.782.497-1.506 1.078-2.261 1.612-.741.554-1.51 1.07-2.226 1.654l-2.157 1.737c-.729.565-1.417 1.178-2.103 1.792l-2.063 1.83-1.971 1.919c-.656.639-1.319 1.271-1.93 1.951-5.031 5.298-9.451 11.078-13.066 17.194A99.518 99.518 0 0 0 5.18 64.379C.805 77.299-.45 90.402.134 102.237c-.126-4.872-.147-11.859.753-18.755zm141.132 90.446a96.807 96.807 0 0 0 8.765-6.389c-2.84 2.339-5.758 4.499-8.765 6.389zm40.217-54.282c-.299.901-.552 1.791-.882 2.641l-.957 2.523-.466 1.248-.513 1.231a108.54 108.54 0 0 0-.997 2.501 97.307 97.307 0 0 1-6.587 13.35c-2.521 4.275-5.443 8.281-8.565 12.04-1.542 1.899-3.222 3.66-4.874 5.421l-2.581 2.523c-.847.848-1.774 1.604-2.652 2.404-.736.64-1.478 1.266-2.225 1.882a90.696 90.696 0 0 0 7.896-7.312 89.808 89.808 0 0 1-11.689 10.188c-1.036.722-2.037 1.496-3.113 2.176l-3.247 2.069-3.43 1.949c-1.167.648-2.399 1.224-3.634 1.855a74.206 74.206 0 0 1 2.685-1.508c1.021-.567 2.092-1.237 3.138-1.85 1.054-.601 2.012-1.261 2.808-1.813.796-.552 1.42-1.01 1.745-1.306-.464.315-.936.617-1.406.924a92.477 92.477 0 0 0 1.507-1.015c-.021.023-.065.059-.101.091 10.932-7.466 20.245-17.277 27.223-28.462 7.009-11.175 11.57-23.781 13.46-36.601-.41 5.142-1.352 9.248-2.543 12.851zm-6.654-65.352zm-8.448-12.698a92.37 92.37 0 0 1 7.773 14.352c.25.549.486 1.106.719 1.664 4.963 12.154 7.221 25.192 6.89 38.036.084-4.25-.198-8.498-.669-12.71-.533-4.854-1.518-9.65-2.824-14.341-2.562-9.407-6.723-18.323-12.005-26.451.485.67.996 1.396 1.525 2.166a32.826 32.826 0 0 1 1.59 2.463l-.638-1.109-.689-1.079-1.378-2.156c-.938-1.424-1.955-2.796-2.934-4.192-1.062-1.334-2.069-2.712-3.174-4.011-.836-.953-1.637-1.938-2.485-2.879 2.992 3.155 5.801 6.54 8.299 10.247zM96.886 1.152c1.467.078 2.937.221 4.407.331 1.204.101 2.402.279 3.588.413.356.015.732.039 1.204.092.471.065 1.034.186 1.769.354 5.469.912 10.459 2.283 14.001 3.699 6.798 2.573 13.123 5.774 18.86 9.471 5.739 3.69 10.889 7.887 15.246 12.471 2.008 2.179 1.422 1.704.315.646l1.662 1.764c-.736-.734-1.459-1.478-2.206-2.196l-2.301-2.09c.56.49 1.918 1.663 2.845 2.522-7.389-7.539-16.026-13.799-25.375-18.404-9.356-4.603-19.431-7.446-29.502-8.581 1.618.18 2.412.22 3.168.24-1.085-.127-2.173-.301-3.274-.401-1.479-.097-2.955-.229-4.423-.301l-4.36-.103c1.444-.001 2.907.039 4.376.073z"></path><path xmlns="http://www.w3.org/2000/svg" d="M115.942 184.69l.426-.125c-.446.12-.885.252-1.334.366.304-.076.609-.15.908-.241zM160.424 146.151c4.235-5.587 7.977-12.263 10.366-18.014l-.029.006c-6.061 14.322-15.892 26.66-28.16 35.744a159.12 159.12 0 0 0 6.418-4.703c2.698-2.82 7.213-7.406 11.405-13.033zM35.35 162.846c7.172 6.412 15.821 11.992 25.448 15.751 3.754 1.413 7.585 2.651 11.503 3.523 1.944.502 3.929.812 5.899 1.181.987.175 1.987.272 2.979.412.994.129 1.986.275 2.987.333-4.519-.501-9.005-1.251-13.372-2.44-4.364-1.185-8.642-2.65-12.769-4.449a97.4 97.4 0 0 1-11.894-6.314c-3.786-2.408-7.376-5.097-10.781-7.997zM123.877 174.277l-2.219.871-2.266.756c-1.5.54-3.047.944-4.59 1.373 1.551-.39 3.111-.754 4.624-1.254l2.283-.698 2.23-.815c-.086-.044-.594.055-.062-.233zM97.683 179.965c-1.16.099-2.326.09-3.494.102-1.168.014-2.338.039-3.509-.038l1.576.148c.482.031.916.068 1.295.113 1.381-.118 2.752-.151 4.132-.325zM51.441 169.209c1.341.787 2.765 1.48 4.178 2.244.354.194.996.415 1.801.709-1.721-.739-3.37-1.655-5.046-2.505-.83-.441-1.629-.935-2.443-1.395-.812-.464-1.621-.927-2.389-1.445l.937.626.977.584 1.985 1.182z"></path></g><g id="SvgjsG31977" featurekey="symbolFeature-0" transform="matrix(1.030802831606067,0,0,1.030802831606067,40.29893121682785,125.50656816724009)" fill="url(#SvgjsLinearGradient31987)"><g xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" font-family="Times New Roman" font-size="16" transform="scale(1 -1)"><g transform="translate(0 -96)"><g><path d="M 21.633,34.925 C 24.973,46.855 40.837,53.71 46.922,66.223 C 49.866,72.279 48.49,83.461 43.464,87.939 C 43.197,88.178 42.09,90.326 43.217,89.521 C 54.416,81.327 63.521,70.509 59.309,60.068 C 53.464,45.577 38.409,38.34 38.519,23.585 C 38.566,17.447 43.088,12.523 48.838,7.375 L 49.073,6.299 C 34.143,10.56 17.742,21.028 21.633,34.925 Z M 59.314,18.723 C 67.987,26.524 73.282,31.263 71.043,40.298 C 73.766,36.119 76.295,30.323 74.135,25.806 C 72.203,21.769 70.28,18.956 63.244,15.02 C 59.515,12.935 56.712,10.677 54.37,6.898 C 54.248,10.853 55.011,14.852 59.314,18.723 Z M 49.686,32.153 C 53.003,38.255 57.845,42.622 62.538,48.882 C 65.869,53.325 68.92,60.704 65.731,66.728 L 65.937,67.016 C 70.824,61.556 71.028,52.654 69.495,46.059 C 67.086,35.69 58.5,31.5 53.511,23.918 C 51.557,20.948 50.446,17.311 51,13.5 C 45.461,18.021 46.717,26.69 49.686,32.153 Z" stroke-linejoin="miter" stroke-linecap="round" stroke="none" stroke-width="0.75" fill="url(#SvgjsLinearGradient31987)" marker-start="none" marker-end="none" stroke-miterlimit="79.8403193612775"></path></g></g></g></g><g id="SvgjsG31978" featurekey="nameFeature-0" transform="matrix(0.5512136790080151,0,0,0.5512136790080151,137.44878632099199,153.0468926872561)" fill="url(#SvgjsLinearGradient31990)"><path d="M14.16 40.56 c-7.08 0 -11.56 -4.16 -13.16 -8.48 l6.32 -1.96 c1.08 2.6 3.56 4.64 7.24 4.64 c2.68 0 4.36 -1.24 4.36 -2.64 c0 -1.16 -0.88 -2 -3 -2.68 l-7.2 -2.24 c-3.68 -1.16 -6.44 -3.72 -6.4 -7.4 c-0.04 -4.6 4.32 -8.36 10.36 -8.36 c6.16 0 10.88 3.44 12.36 7.36 l-6.12 1.8 c-1.08 -1.96 -3.48 -3.36 -6.16 -3.36 c-2.28 0 -3.72 1.04 -3.72 2.32 c0 0.96 0.68 1.64 1.88 2 l7.04 2.24 c4.2 1.32 7.68 3.16 7.68 7.88 c0 5 -4.56 8.88 -11.48 8.88 z M52.194 19.04 c4.84 0 8.12 3.12 8.12 8.92 l0 12.04 l-6.4 0 l0 -10.6 c0 -2.68 -0.84 -4.44 -3.24 -4.44 c-2.52 0 -3.56 1.8 -3.56 4.92 l0 10.12 l-6.4 0 l0 -10.6 c0 -2.68 -0.84 -4.44 -3.24 -4.44 c-2.52 0 -3.56 1.8 -3.56 4.92 l0 10.12 l-6.4 0 l0 -20.4 l6.4 0 l0 2 c1.28 -1.48 3.2 -2.56 5.64 -2.56 c2.76 0 4.72 1 5.92 2.72 c1.4 -1.48 3.6 -2.72 6.72 -2.72 z M71.908 40.56 c-5.52 0 -9.92 -4.56 -9.92 -10.76 s4.4 -10.76 9.92 -10.76 c2.52 0 4.48 0.92 5.88 2.44 l0 -1.88 l6.4 0 l0 20.4 l-6.4 0 l0 -1.88 c-1.4 1.48 -3.36 2.44 -5.88 2.44 z M73.068 34.88 c2.76 0 4.88 -2.04 4.88 -5.12 c0 -3.04 -2.12 -5.04 -4.88 -5.04 s-4.76 2 -4.76 5.04 c0 3.08 2 5.12 4.76 5.12 z M93.66199999999999 22.36 c1.2 -2.2 3.4 -3.44 6.4 -3.04 l0 6 c-4.32 -0.72 -6.4 1.12 -6.4 6.16 l0 8.52 l-6.4 0 l0 -20.4 l6.4 0 l0 2.76 z M113.37599999999999 34.24 l1.52 5.08 c-1.72 0.68 -3.2 1 -5 1 c-4.96 0 -7.2 -3.04 -7.2 -7.68 l0 -7.44 l-3.16 0 l0 -5.6 l3.16 0 l0 -6.4 l6.4 0 l0 6.4 l5.48 0 l0 5.6 l-5.48 0 l0 7.44 c0 1.36 0.68 2.12 2.12 2.12 c0.84 0 1.48 -0.16 2.16 -0.52 z M146.92399999999998 12 l0 6 l-8.92 0 l0 22 l-6.64 0 l0 -22 l-8.92 0 l0 -6 l24.48 0 z M154.598 22.36 c1.2 -2.2 3.4 -3.44 6.4 -3.04 l0 6 c-4.32 -0.72 -6.4 1.12 -6.4 6.16 l0 8.52 l-6.4 0 l0 -20.4 l6.4 0 l0 2.76 z M171.192 40.56 c-5.52 0 -9.92 -4.56 -9.92 -10.76 s4.4 -10.76 9.92 -10.76 c2.52 0 4.48 0.92 5.88 2.44 l0 -1.88 l6.4 0 l0 20.4 l-6.4 0 l0 -1.88 c-1.4 1.48 -3.36 2.44 -5.88 2.44 z M172.352 34.88 c2.76 0 4.88 -2.04 4.88 -5.12 c0 -3.04 -2.12 -5.04 -4.88 -5.04 s-4.76 2 -4.76 5.04 c0 3.08 2 5.12 4.76 5.12 z M196.26600000000002 40.56 c-6.32 0 -10.92 -4.64 -10.92 -10.76 s4.6 -10.76 10.84 -10.76 c5.84 0 9.44 3.72 10.2 6.92 l-5.92 1.68 c-0.36 -1.48 -1.96 -2.96 -4.24 -2.96 c-2.84 0 -4.64 2.32 -4.64 5.08 c0 2.72 1.8 5.16 4.64 5.16 c2.28 0 3.88 -1.4 4.24 -2.88 l5.92 1.68 c-0.76 3.2 -4.36 6.84 -10.12 6.84 z M221.42000000000002 40 l-5 -7.08 l-1.96 2.24 l0 4.84 l-6.4 0 l0 -29.2 l6.4 0 l0 16.28 l6.12 -7.48 l7.36 0 l-7.56 8.72 l8.24 11.68 l-7.2 0 z M238.09400000000005 40.56 c-6.64 0 -11.2 -4.36 -11.2 -10.72 c0 -6.12 4.28 -10.8 10.8 -10.8 c6.76 0 10.68 4.68 10.68 10.56 c0 0.72 -0.04 1.44 -0.16 2.12 l-15.08 0 c0.4 1.92 1.8 3.52 5.08 3.52 c2.16 0 3.4 -0.84 4.08 -2.08 l5.76 1.68 c-1.08 2.52 -4.52 5.72 -9.96 5.72 z M233.13400000000004 27.880000000000003 l9 0 c-0.2 -1.84 -1.84 -3.48 -4.48 -3.48 s-4.24 1.76 -4.52 3.48 z M256.648 22.36 c1.2 -2.2 3.4 -3.44 6.4 -3.04 l0 6 c-4.32 -0.72 -6.4 1.12 -6.4 6.16 l0 8.52 l-6.4 0 l0 -20.4 l6.4 0 l0 2.76 z"></path></g><g id="SvgjsG31979" featurekey="sloganFeature-0" transform="matrix(0.37254358647647906,0,0,0.37254358647647906,151.7392193828809,182.98826477514112)" fill="url(#SvgjsLinearGradient31993)"><path d="M6.88 20.26 c-3.18 0 -5.46 -1.98 -6.18 -4.2 l1.52 -0.46 c0.62 1.78 2.36 3.22 4.74 3.22 c2.24 0 3.66 -1.3 3.66 -2.62 c0 -1.08 -0.66 -1.76 -2.56 -2.36 l-3.5 -1.12 c-1.86 -0.6 -3.1 -1.58 -3.1 -3.28 c0 -1.98 1.96 -3.7 4.68 -3.7 c2.92 0 4.9 1.54 5.7 3.4 l-1.48 0.46 c-0.68 -1.46 -2.18 -2.42 -4.24 -2.42 c-1.82 0 -3.06 1.04 -3.06 2.22 c0 0.94 0.6 1.5 2.18 2 l3.4 1.08 c2.18 0.7 3.56 1.56 3.56 3.64 c0 2.24 -2.16 4.14 -5.32 4.14 z M20.200000000000003 18.38 l0.42 1.32 c-0.7 0.3 -1.34 0.44 -2.08 0.44 c-2 0 -2.92 -1.26 -2.92 -3.18 l0 -5.54 l-1.98 0 l0 -1.4 l1.98 0 l0 -3.44 l1.54 0 l0 3.44 l3.42 0 l0 1.4 l-3.42 0 l0 5.54 c0 1.12 0.52 1.76 1.62 1.76 c0.52 0 0.9 -0.08 1.42 -0.34 z M27.299999999999997 20.26 c-2.88 0 -5.04 -2.26 -5.04 -5.26 s2.16 -5.22 5.04 -5.22 c1.78 0 3.14 0.8 3.94 2.04 l0 -1.8 l1.54 0 l0 9.98 l-1.54 0 l0 -1.82 c-0.8 1.28 -2.16 2.08 -3.94 2.08 z M27.52 18.86 c2.06 0 3.76 -1.64 3.76 -3.84 s-1.7 -3.84 -3.76 -3.84 c-2.2 0 -3.74 1.62 -3.74 3.84 c0 2.2 1.54 3.84 3.74 3.84 z M43.34 10.02 l1.64 0 l-6.14 14.18 l-1.62 0 l1.9 -4.4 l-4.62 -9.78 l1.7 0 l3.7 8.06 z M56.52 20.26 c-3.02 0 -5.28 -2.28 -5.28 -5.26 s2.26 -5.22 5.28 -5.22 s5.26 2.24 5.26 5.22 s-2.24 5.26 -5.26 5.26 z M56.52 18.84 c2.14 0 3.74 -1.64 3.74 -3.82 s-1.6 -3.84 -3.74 -3.84 c-2.16 0 -3.78 1.66 -3.78 3.84 s1.62 3.82 3.78 3.82 z M69.38 9.78 c2.48 0 4 1.62 4 4.36 l0 5.86 l-1.54 0 l0 -5.64 c0 -1.94 -0.98 -3.14 -2.8 -3.14 c-2 0 -3.36 1.52 -3.36 3.76 l0 5.02 l-1.54 0 l0 -9.98 l1.54 0 l0 1.76 c0.7 -1.14 1.96 -2 3.7 -2 z M86.94000000000001 18.38 l0.42 1.32 c-0.7 0.3 -1.34 0.44 -2.08 0.44 c-2 0 -2.92 -1.26 -2.92 -3.18 l0 -5.54 l-1.98 0 l0 -1.4 l1.98 0 l0 -3.44 l1.54 0 l0 3.44 l3.42 0 l0 1.4 l-3.42 0 l0 5.54 c0 1.12 0.52 1.76 1.62 1.76 c0.52 0 0.9 -0.08 1.42 -0.34 z M91.18000000000002 11.74 c0.6 -1.3 1.82 -2.08 3.58 -1.84 l0 1.44 c-2.16 -0.28 -3.58 0.86 -3.58 4 l0 4.66 l-1.54 0 l0 -9.98 l1.54 0 l0 1.72 z M101.12000000000002 20.26 c-2.88 0 -5.04 -2.26 -5.04 -5.26 s2.16 -5.22 5.04 -5.22 c1.78 0 3.14 0.8 3.94 2.04 l0 -1.8 l1.54 0 l0 9.98 l-1.54 0 l0 -1.82 c-0.8 1.28 -2.16 2.08 -3.94 2.08 z M101.34000000000002 18.86 c2.06 0 3.76 -1.64 3.76 -3.84 s-1.7 -3.84 -3.76 -3.84 c-2.2 0 -3.74 1.62 -3.74 3.84 c0 2.2 1.54 3.84 3.74 3.84 z M114.16000000000001 20.26 c-3 0 -5.2 -2.28 -5.2 -5.28 c0 -2.96 2.2 -5.2 5.2 -5.2 c2.56 0 4.22 1.64 4.62 3.02 l-1.44 0.42 c-0.32 -1.02 -1.54 -2.06 -3.18 -2.06 c-2.24 0 -3.68 1.78 -3.68 3.86 c0 2.02 1.44 3.84 3.68 3.84 c1.64 0 2.86 -0.98 3.18 -2 l1.44 0.38 c-0.4 1.42 -2.06 3.02 -4.62 3.02 z M128.04000000000002 20 l-3.84 -4.6 l-1.52 1.58 l0 3.02 l-1.54 0 l0 -14.6 l1.54 0 l0 9.6 l4.76 -4.98 l1.9 0 l-4.14 4.34 l4.66 5.64 l-1.82 0 z M148.88000000000002 10.02 l1.6 0 l-3.42 9.98 l-1.5 0 l-2.52 -7.68 l-2.54 7.68 l-1.5 0 l-3.44 -9.98 l1.62 0 l2.62 8.02 l2.56 -8.02 l1.34 0 l2.56 8.02 z M153.06000000000003 8.16 c-0.6 0 -1.06 -0.46 -1.06 -1.06 c0 -0.56 0.46 -1.02 1.06 -1.02 s1.06 0.46 1.06 1.02 c0 0.6 -0.46 1.06 -1.06 1.06 z M152.30000000000004 20 l0 -9.98 l1.54 0 l0 9.98 l-1.54 0 z M162.4 18.38 l0.42 1.32 c-0.7 0.3 -1.34 0.44 -2.08 0.44 c-2 0 -2.92 -1.26 -2.92 -3.18 l0 -5.54 l-1.98 0 l0 -1.4 l1.98 0 l0 -3.44 l1.54 0 l0 3.44 l3.42 0 l0 1.4 l-3.42 0 l0 5.54 c0 1.12 0.52 1.76 1.62 1.76 c0.52 0 0.9 -0.08 1.42 -0.34 z M170.34000000000003 9.78 c2.48 0 4 1.62 4 4.36 l0 5.86 l-1.54 0 l0 -5.64 c0 -1.94 -0.98 -3.14 -2.8 -3.14 c-2 0 -3.36 1.52 -3.36 3.76 l0 5.02 l-1.54 0 l0 -14.6 l1.54 0 l0 6.38 c0.7 -1.14 1.96 -2 3.7 -2 z M186.08 20.26 c-2.28 0 -4.08 -1.36 -4.58 -3.02 l1.44 -0.4 c0.36 1.16 1.6 2.08 3.18 2.08 c1.5 0 2.5 -0.76 2.5 -1.64 c0 -0.78 -0.44 -1.14 -1.46 -1.44 l-2.84 -0.84 c-1.24 -0.36 -2.32 -1.02 -2.32 -2.42 c0 -1.5 1.58 -2.8 3.66 -2.8 c2.14 0 3.64 1.1 4.22 2.48 l-1.4 0.42 c-0.36 -0.86 -1.38 -1.6 -2.84 -1.6 c-1.34 0 -2.12 0.78 -2.12 1.48 c0 0.64 0.52 0.96 1.34 1.2 l2.84 0.84 c1.32 0.4 2.44 1.04 2.44 2.6 c0 1.74 -1.7 3.06 -4.06 3.06 z M204.26 9.78 c2.38 0 3.88 1.54 3.88 4.22 l0 6 l-1.54 0 l0 -5.76 c0 -1.88 -0.86 -3.02 -2.6 -3.02 c-1.7 0 -2.86 1.36 -2.86 3.44 l0 5.34 l-1.54 0 l0 -5.76 c0 -1.86 -0.82 -3.02 -2.46 -3.02 c-1.76 0 -2.98 1.46 -2.98 3.68 l0 5.1 l-1.54 0 l0 -9.98 l1.54 0 l0 1.64 c0.64 -1.08 1.78 -1.88 3.32 -1.88 c1.52 0 2.62 0.7 3.2 1.92 c0.62 -1.08 1.8 -1.92 3.58 -1.92 z M215.44000000000003 20.26 c-2.88 0 -5.04 -2.26 -5.04 -5.26 s2.16 -5.22 5.04 -5.22 c1.78 0 3.14 0.8 3.94 2.04 l0 -1.8 l1.54 0 l0 9.98 l-1.54 0 l0 -1.82 c-0.8 1.28 -2.16 2.08 -3.94 2.08 z M215.66000000000003 18.86 c2.06 0 3.76 -1.64 3.76 -3.84 s-1.7 -3.84 -3.76 -3.84 c-2.2 0 -3.74 1.62 -3.74 3.84 c0 2.2 1.54 3.84 3.74 3.84 z M225.46 11.74 c0.6 -1.3 1.82 -2.08 3.58 -1.84 l0 1.44 c-2.16 -0.28 -3.58 0.86 -3.58 4 l0 4.66 l-1.54 0 l0 -9.98 l1.54 0 l0 1.72 z M236.48000000000002 18.38 l0.42 1.32 c-0.7 0.3 -1.34 0.44 -2.08 0.44 c-2 0 -2.92 -1.26 -2.92 -3.18 l0 -5.54 l-1.98 0 l0 -1.4 l1.98 0 l0 -3.44 l1.54 0 l0 3.44 l3.42 0 l0 1.4 l-3.42 0 l0 5.54 c0 1.12 0.52 1.76 1.62 1.76 c0.52 0 0.9 -0.08 1.42 -0.34 z M249.84000000000003 18.38 l0.42 1.32 c-0.7 0.3 -1.34 0.44 -2.08 0.44 c-2 0 -2.92 -1.26 -2.92 -3.18 l0 -5.54 l-1.98 0 l0 -1.4 l1.98 0 l0 -3.44 l1.54 0 l0 3.44 l3.42 0 l0 1.4 l-3.42 0 l0 5.54 c0 1.12 0.52 1.76 1.62 1.76 c0.52 0 0.9 -0.08 1.42 -0.34 z M254.08000000000004 11.74 c0.6 -1.3 1.82 -2.08 3.58 -1.84 l0 1.44 c-2.16 -0.28 -3.58 0.86 -3.58 4 l0 4.66 l-1.54 0 l0 -9.98 l1.54 0 l0 1.72 z M264.02000000000004 20.26 c-2.88 0 -5.04 -2.26 -5.04 -5.26 s2.16 -5.22 5.04 -5.22 c1.78 0 3.14 0.8 3.94 2.04 l0 -1.8 l1.54 0 l0 9.98 l-1.54 0 l0 -1.82 c-0.8 1.28 -2.16 2.08 -3.94 2.08 z M264.24000000000007 18.86 c2.06 0 3.76 -1.64 3.76 -3.84 s-1.7 -3.84 -3.76 -3.84 c-2.2 0 -3.74 1.62 -3.74 3.84 c0 2.2 1.54 3.84 3.74 3.84 z M277.06000000000006 20.26 c-3 0 -5.2 -2.28 -5.2 -5.28 c0 -2.96 2.2 -5.2 5.2 -5.2 c2.56 0 4.22 1.64 4.62 3.02 l-1.44 0.42 c-0.32 -1.02 -1.54 -2.06 -3.18 -2.06 c-2.24 0 -3.68 1.78 -3.68 3.86 c0 2.02 1.44 3.84 3.68 3.84 c1.64 0 2.86 -0.98 3.18 -2 l1.44 0.38 c-0.4 1.42 -2.06 3.02 -4.62 3.02 z M290.94000000000005 20 l-3.84 -4.6 l-1.52 1.58 l0 3.02 l-1.54 0 l0 -14.6 l1.54 0 l0 9.6 l4.76 -4.98 l1.9 0 l-4.14 4.34 l4.66 5.64 l-1.82 0 z M298.58000000000004 20.26 c-3.06 0 -5.26 -2.06 -5.26 -5.26 c0 -2.94 2.04 -5.22 5.08 -5.22 c3.18 0 5 2.22 5 5 c0 0.28 0 0.46 -0.04 0.72 l-8.52 0 c0.14 2 1.52 3.4 3.74 3.4 c1.72 0 2.82 -0.92 3.3 -1.94 l1.42 0.42 c-0.66 1.42 -2.18 2.88 -4.72 2.88 z M294.84000000000003 14.36 l7.04 -0.02 c-0.14 -1.86 -1.38 -3.2 -3.48 -3.2 c-2.02 0 -3.42 1.48 -3.56 3.22 z M307.30000000000007 11.74 c0.6 -1.3 1.82 -2.08 3.58 -1.84 l0 1.44 c-2.16 -0.28 -3.58 0.86 -3.58 4 l0 4.66 l-1.54 0 l0 -9.98 l1.54 0 l0 1.72 z"></path></g></svg>'
}