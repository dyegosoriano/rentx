import { container } from 'tsyringe'

import { IDateProvider } from './DateProvider/IDateProvider'
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'

container.registerInstance<IStorageProvider>('StorageProvider', new LocalStorageProvider())

container.registerSingleton<IMailProvider>('EtherealMailProvider', EtherealMailProvider)
container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider)
