import {
  BrowserStorageLeadDataSource,
  CreateLeadUseCase,
  FakeLeadDataSource,
  FilterLeadsUseCase,
  FindLeadByIdUseCase,
  LeadRepository,
} from "@packages/customer-acquisition";
import { LeadCreatedEvent } from "@packages/customer-acquisition/application/domain";
import {
  ConsoleLoggerAdapter,
  EventDispatcherAdapter,
  FakeIdentifierAdapter,
  IdentifierProvider,
  LoggerEventHandlerAdapter,
  LoggerProvider,
} from "@packages/shared";
import {
  consoleLoggerSettings,
  isBrowser,
} from "@/modules/customer-acquisition/configs";

const logger = new ConsoleLoggerAdapter(consoleLoggerSettings);
const identifier = new FakeIdentifierAdapter();

const loggerProvider = new LoggerProvider(logger);
const identifierProvider = new IdentifierProvider(identifier);

const loggerEventHandler = new LoggerEventHandlerAdapter(logger);
const eventDispatcher = new EventDispatcherAdapter();
const leadDataSource =
  isBrowser && window.localStorage
    ? new BrowserStorageLeadDataSource(window.localStorage)
    : new FakeLeadDataSource();
const leadRepository = new LeadRepository(leadDataSource);
const findLeadByIdUseCase = new FindLeadByIdUseCase(leadDataSource);
const filterLeadsUseCase = new FilterLeadsUseCase(leadDataSource);
const createLeadUseCase = new CreateLeadUseCase(
  leadRepository,
  eventDispatcher
);

eventDispatcher.register(LeadCreatedEvent.name, loggerEventHandler);

export { createLeadUseCase, findLeadByIdUseCase, filterLeadsUseCase };