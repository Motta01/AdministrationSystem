export var recomendation = [
    {
        service: 'todo',
        description1: 'Asegúrese de que su sistema esté actualizado con los últimos parches de seguridad. Esto significa ir al sitio de actualizaciones de Windows.',
        description2: 'Asegúrese de tener una buena solución de firewall, no solo el software predeterminado de firewall de Windows. Si bien está bien, no funciona tan bien como otros firewalls gratuitos o pagos.',
        description3: 'Eche un vistazo a sus elementos y servicios de inicio a través de MSCONFIG y borre sus archivos temporales y caché de Internet. Puede ir a Inicio> Ejecutar> y escribir% temp%, luego presionar enter para acceder a la mayoría de sus archivos temporales. También deberá acceder a su navegador de Internet y borrar su caché, incluidos los archivos sin conexión. ',
        description4: 'Descargue programas como Malwarebytes , Superantispyware o spybot , y una vez que los haya descargado, asegúrese de que estén actualizados. Luego, una vez que se actualicen, reinicie su sistema y entre en modo seguro sin necesidad de red y ejecute un escaneo completo con cada uno. También tenga en cuenta que Hijackthis es un excelente programa para encontrar agujeros de seguridad y malware en un sistema, y ​​es posible que desee descargar un explorador de rootkits . ',
        description5: 'Una vez que piense que su sistema es seguro, es hora de asegurarse de que se mantenga de esa manera. Con Firefox puedes descargar complementos como noscript y WOT para evitar que tu sistema se haga cargo mientras navegas. También la actualización de su archivo de host con programas como Hostsman hace maravillas. Programas como Peerguardian y Protowall ayudarán a evitar que los IP obtengan su información, y si se siente realmente vulnerable, instale y actualice un programa de antivirus. Si realmente quieres llevarlo al extremo, ejecuta todos tus navegadores en una máquina virtual o un programa de espacio aislado como Sandboxie (gracias a Logan por este hallazgo)',
    },
    {
        service: 'mysql',
        description: 'Continuar con el puerto abierto y configurar el servicio para determinar que IP’s se les puede aceptar una petición de conexión.',
    },
    {
        service: 'dns',
        description:'Usar DNS over TLS, para cifrar y ajustar consultas y respuestas del Sistema de nombres de dominio (DNS) a través del protocolo de Seguridad de la capa de transporte (TLS), con el objetivo de aumentar la privacidad y la seguridad del servicio de manipulación de datos DNS a través de ataques man-in-the-middle .',
    },
    {
        service: 'Telnet.Windows',
        description: 'Aconsejable usar SSH debido a que los datos enviados por telnet se envían en texto plano en contraste con SSH, que encripta los datos.'
    },
    {
        service: 'SNMP',
        description:'Configurar el servicio para que pueda utilizar el protocolo SSL/TLS ya que este protocolo utiliza algoritmos de cifrado que hace que los datos que se transfieren entre dos sistemas sean imposibles de leer.'
    },
    {
        service: 'TFTP',
        description:'Utilizar protocolo SFTP (Protocolo de transferencia segura de archivos) para cifrar la transferencia de archivos con Secure Shell'
    },
    {
        service: 'FTP',
        description:'Utilizar protocolo SFTP (Protocolo de transferencia segura de archivos) para cifrar la transferencia de archivos con Secure Shell'
    },
    {
        service: 'SMTP',
        description:'Cifrado: cuando asegure su servidor de correo, asegúrese de estar utilizando conexiones seguras. Cifre la autenticación POP3 e IMAP y use SSL y TLS. ' +'Configuración de retransmisión de correo: evite ser un retransmisor abierto para los remitentes de correo no deseado especificando qué dominios / direcciones IP su servidor de correo retransmitirá. ' +'Conexiones y configuraciones predeterminadas: para evitar ataques DoS, limite el número de errores de conexión y autenticación que sus sistemas aceptarán. Elimine la funcionalidad innecesaria del servidor al deshabilitar cualquier configuración predeterminada innecesaria. Tener un servidor de correo dedicado y mover otros servicios como FTP a otros servidores. Mantenga las conexiones totales, simultáneas y máximas limitadas a su servidor SMTP',
    },
];
