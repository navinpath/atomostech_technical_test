
import Pino from 'pino';
import PinoHttp from 'pino-http';

let project;
export const initLogCorrelation = (projectId) => {
  project = projectId;
};

const formatters = {
  level(label, number) {
    return { severity: label };
  },
};


export const logger = Pino({
  formatters,
  messageKey: 'message',
});


export const pinoHttp = PinoHttp({
  logger,
  reqCustomProps: function (req) {
    const traceHeader = req.header('X-Cloud-Trace-Context');
    let trace;
    if (traceHeader) {
      const [traceId] = traceHeader.split('/');
      trace = `projects/${project}/traces/${traceId}`;
    }
    return {
      'logging.googleapis.com/trace': trace,
    };
  },
});